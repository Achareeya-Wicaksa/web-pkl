import React from 'react';
import Button from '../../../components/Button';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { BsEmojiLaughing } from 'react-icons/bs';

const FormPendaftaran = props => {

    const [values, setValues] = React.useState({
        name: '',
        email: '',
        school_origin: '',
        total_trainee: 0,
        division_id: 0,
        study_field_id: 0,
        start_date: '',
        end_date: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const [file, setFile] = React.useState();
    function handleChangeFile(event) {
        setFile(event.target.files[0])
    }

        const current = new Date();
        values.month=(current.getMonth()+1)
        values.date=(current.getDate())
        values.year=(current.getFullYear())
        if( values.month ==1||values.month==2||
            values.month ==3||values.month==4||
            values.month ==5||values.month==6||
            values.month ==7||values.month==8||
            values.month ==9){
            values.month= '0'+values.month;
        }
        if( values.date ==1||values.date==2||
            values.date ==3||values.date==4||
            values.date ==5||values.date==6||
            values.date ==7||values.date==8||
            values.date ==9){
            values.date= '0'+values.date;
        }
        values.now=values.year+'-'+values.month+'-'+values.date;

    const handleSubmit = async (event) => {
        event.preventDefault()
        const date_start = values.start_date + 'T00:00:00Z';
        const date_end = values.end_date + 'T00:00:00Z';
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('school_origin', values.school_origin);
        formData.append('total_trainee', values.total_trainee);
        formData.append('division_id', values.division_id);
        formData.append('study_field_id', values.study_field_id);
        formData.append('start_date', date_start);
        formData.append('end_date', date_end);
        await axios.post(
            `${process.env.REACT_APP_API_HOST}/submissions`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        )
            .then(function (response) {
                // handle success
                localStorage.setItem('code_submission', response.data.code_submission);
                localStorage.setItem('jumlah_anggota', values.total_trainee);
                props.showPendaftaran(false);
                props.showTrainee(true);
                //console.log('axios', response);
            })
            .catch(function (error) {
                // handle error
                
                //console.log(error);
            });

          //  if(error!=""){
          //      alert(error);
          //  }
        
    }

var error

    if(values.study_field_id==""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 fixed bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan isi bidang keilmuan sesuai dengan jurusan Anda</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    if(values.division_id==""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 relative bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan masukan divisi yang ingin Anda ajukan</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    if(values.total_trainee == ""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 relative bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan masukan jumlah anggota kelompok Anda</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    if(values.school_origin==""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 relative bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan masukan nama sekolah Anda</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    if(values.email==""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 relative bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan masukan email Anda atau ketua kelompok</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    if(values.name==""){
        error=
        <div class="animate-jump-in animate-once animate-delay-2000 p-8 space-y-4 relative bottom-0 right-0 ">
        <div class="Message Message--green">
            <div class="Message-icon">
                <i class="fa fa-exclamation"></i>
            </div>
            <div class="Message-body">
                <h2>Silakan isi data berikut ini dengan benar</h2>
            </div>
            <button class="Message-close js-messageClose"><i class="fa fa-times"></i></button>
      </div>
      </div>
    }
    return (

        <div data-aos="fade-down" data-aos-offset="200" data-aos-delay="50" data-aos-duration="1000" data-aos-easing="ease-in-out" data-aos-mirror="true" data-aos-once="false" data-aos-anchor-placement="top-center">
        
        <div className="mt-12 mb-24 flex flex-col items-center">
            <b className="mt-5 mb-5 text-3xl text-[#35A5D9] mt-6 text-white animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-1000">Data Kelompok</b>
            <Helmet>
                <title>Pendaftaran</title>
            </Helmet>
            <form onSubmit={handleSubmit}>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Nama (Ketua Kelompok)</label>
                    <input onChange={handleChange('name')} value={values.name} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Email (Ketua Kelompok)</label>
                    <input onChange={handleChange('email')} value={values.email} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Asal Sekolah</label>
                    <input onChange={handleChange('school_origin')} value={values.school_origin} type="text" id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Jumlah Anggota (Termasuk Ketua)</label>
                    <input type="text" onChange={handleChange('total_trainee')} value={values.total_trainee} id="base-input" class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Divisi</label>
                    <select id="countries" onChange={handleChange('division_id')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        <option value="">Choose Option</option>
                        {props.dataDivisi?.map((val, index) => (
                            <option key={index} value={val.id}>{val.division_name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Bidang Keilmuan</label>
                    <select id="countries" onChange={handleChange('study_field_id')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5">
                        <option value="">Choose Option</option>
                        {props.dataKeilmuan?.map((val, index) => (
                            <option key={index} value={val.id}>{val.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Mulai</label>
                    <input type="date" min={values.now} onChange={handleChange('start_date')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>
                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Tanggal Selesai</label>
                    <input type="date" min={values.start_date} onChange={handleChange('end_date')} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" />
                </div>

                <div className="mt-4">
                    <label for="countries" className="block mb-2 text-sm font-medium text-gray-900">Upload Surat Pengantar (maksimal 2 mb)</label>
                    <input type="file" onChange={handleChangeFile} className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[40rem] p-2.5" id="file" />
                </div>

                <Button text={"Submit"} type={"submit"} className="mt-12 w-[40rem] rounded-md bg-[#35A5D9] hover:bg-[#E7F7FF] hover:text-[#35A5D9] font-normal" />
            </form>
                            {error}
        </div>
        </div>
        
    );
}

export default FormPendaftaran;