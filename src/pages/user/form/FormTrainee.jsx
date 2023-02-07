import React from 'react';
import axios from "axios";
import Button from '../../../components/Button';
import { useNavigate } from "react-router-dom";

const FormTrainee = () => {
    const codeSubmission = localStorage.getItem('code_submission');
    const jumlahAnggota = localStorage.getItem('jumlah_anggota');

    const navigate = useNavigate();

    const [values, setValues] = React.useState({
        name: '',
        trainee_student_id: '',
        email: '',
        jurusan: '',
        gender: '',
        phone: '',
    });

    React.useEffect(() => {
        const getLeader = async () => {
            try {

                await axios.get(
                    `${process.env.REACT_APP_API_HOST}/submissions/${codeSubmission}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                )
                    .then((response) => {
                        setValues(v => { return ({ ...v, name: response.data.submission.name, email: response.data.submission.email }) });
                    });
            } catch (error) {
                throw new Error(`Error: ${error}`)
            }
        };

        getLeader();
    }, []);

    const [next, setNext] = React.useState(true);
    const [submit, setSubmit] = React.useState(false);

    const count = React.useRef(1);
    const clickedButton = async (event) => {
        // pengecekan jika jumlah anggota = 1
        if (jumlahAnggota == 1) {
            await axios.post(
                `${process.env.REACT_APP_API_HOST}/trainees/${codeSubmission}`,
                {
                    name: values.name,
                    trainee_student_id: values.trainee_student_id,
                    email: values.email,
                    jurusan: values.jurusan,
                    gender: values.gender,
                    phone: values.phone
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(function (response) {
                    //handle succes
                   alert=<div class="min-h-screen">
    
    <div class="fixed h-screen w-screen flex items-center justify-center">

        <div class="absolute inset-0 bg-gray-200 z-10">
        </div>

        <div class="max-w-xl w-full bg-white shadow-lg z-50 rounded-lg overflow-hidden">
            <div class="p-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div class="bg-red-50 p-3 md:self-start rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-red-700" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
                </div>
                <div>
                    <h1 class="text-xl font-semibold tracking-wide text-red-700 block md:flex justify-between">
                        <span>Deactivate account</span>
                        <span class=" hidden md:inline-flex cursor-pointer">
                            <svg class="w-4 h-4 hidden md:inline-flex fill-current text-gray-400 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
                        </span>
                    </h1>
                    <p class="text-gray-500">
                    ("Selamat anda telah berhasil terdaftar, silahkan simpan kode registrasi berikut : " + codeSubmission);
                    </p>
                </div>
            </div>
            <div class="p-3 bg-gray-50 text-right md:space-x-4 md:block flex flex-col-reverse">
                <button class="px-4 md:py-1.5 py-2 bg-white border-2 rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-blue-800 hover:bg-gray-50">
                    Cancel
                </button>
                <button class="mb-2 md:mb-0 px-4 md:py-1.5 py-2 bg-red-700 text-white rounded-lg focus:ring-offset-2 focus:outline-none focus:ring-2 focus:ring-red-800 hover:bg-red-800">
                    Deactivate
                </button>
            </div>
        </div>
    </div>

    </div>
                    
                    console.log('axios', response);
                    navigate("/cekajuan");
                })
                .catch(function (error) {
                    // handle error
                    alert(error);
                    console.log(error);
                });
        }
        // pengecekan jika jumlah anggota lebih dari 1
        else if (count.current <= jumlahAnggota) {
            await axios.post(
                `${process.env.REACT_APP_API_HOST}/trainees/${codeSubmission}`,
                {
                    name: values.name,
                    trainee_student_id: values.trainee_student_id,
                    email: values.email,
                    jurusan: values.jurusan,
                    gender: values.gender,
                    phone: values.phone
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then(function (response) {
                    // handle success
                    console.log('axios', response);
                    count.current = count.current + 1;
                    if (count.current == jumlahAnggota) { setNext(false); setSubmit(true); } // step untuk anggota terakhir
                    setValues(v => {
                        return ({
                            ...v,
                            name: '',
                            trainee_student_id: '',
                            email: '',
                            jurusan: '',
                            gender: '',
                            phone: '',
                        })
                    });
                })
                .catch(function (error) {
                    // handle error
                    alert(error);
                    console.log(error);
                });
        }
    }

    // submit data terakhir
    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('trainee_student_id', values.trainee_student_id);
        formData.append('email', values.email);
        formData.append('jurusan', values.jurusan);
        formData.append('gender', values.gender);
        formData.append('phone', values.phone);

        await axios.post(
            `${process.env.REACT_APP_API_HOST}/trainees/${codeSubmission}`,
            formData,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )
            .then(function (response) {
                // handle success
                alert("Selamat anda telah berhasil terdaftar, silahkan simpan kode registrasi berikut : " + codeSubmission);
                console.log('axios', response);
                navigate("/cekajuan");
            })
            .catch(function (error) {
                // handle error
                alert(error);
                console.log(error);
            });
    }

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    return (

        <div className="mt-12 mb-24 flex flex-col items-center">

            {count.current && <b className="mt-5 mb-5 text-3xl text-[#35A5D9] mt-6 text-white animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-900">Data Anggota {+ count.current}</b>}

            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nama</label>
                <input value={values.name} onChange={handleChange('name')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">NIM</label>
                <input value={values.trainee_student_id} onChange={handleChange('trainee_student_id')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                <input value={values.email} onChange={handleChange('email')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jurusan</label>
                <input value={values.jurusan} onChange={handleChange('jurusan')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jenis Kelamin</label>
                <select onChange={handleChange('gender')} value={values.gender} id="countries" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                    <option value="">Choose Option</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                </select>
            </div>
            <div className="mt-4">
                <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nomor Telepon</label>
                <input value={values.phone} onChange={handleChange('phone')} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
            </div>
            <br /><br />

            {next ? <Button text={"Submit"} onClick={clickedButton} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" /> : null}
            {submit ? <Button text={"Submit"} onClick={handleSubmit} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" /> : null}
        </div>
    );
}

export default FormTrainee;
