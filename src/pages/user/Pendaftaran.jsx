import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import FormPeriksa from "./form/FormPeriksa";
import FormPendaftaran from "./form/FormPendaftaran";
import FormTrainee from "./form/FormTrainee";
import React from "react";
import axios from "axios";
      let labels = []
      let quota = []
      let acc = []
export default function Pendaftaran() {
    // const [periksa, setPeriksa] = React.useState(false);
    const [showModal, setShowModal] = React.useState(true);
    const [pendaftaran, setPendaftaran] = React.useState(true);
    const [trainee, setTrainee] = React.useState(false);
    const [anggota, setAnggota] = React.useState(0);
    const [label,setLabel] = React.useState([])
    const [dataDivisi, setDataDivisi] = React.useState();
    const [dataKeilmuan, setDataKeilmuan] = React.useState();
    React.useEffect(() => {
        const getDivision = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_HOST}/list_division_fields`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setDataDivisi(response.data.data);
                });
        };
        getDivision();

        const getKeilmuan = async () => {
            await axios.get(
                `${process.env.REACT_APP_API_HOST}/study_fields`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
                .then((response) => {
                    setDataKeilmuan(response.data.study_field);
                });
        };
        getKeilmuan();
    }, []);

    axios.get(`${process.env.REACT_APP_API_HOST}/charts/all_division`)
    .then((res) => {
        //res.preventdefault()
      for(let i=0;i<res.data.division.length;i++) {
        labels.push(res.data.division[i].name)
        quota.push(res.data.division[i].quota)
        acc.push(res.data.division[i].total)
      }
      
      setLabel(res.data.division.name)
        console.log(labels[2])
         //
     

    })

const arr = labels.map((labels,index) =>{
   return (
    <div>
   <p class="text-sm text-gray-500 ">{labels}</p>
   <p>Kuota tersedia adalah : {quota[index]-acc[index]}</p> <br></br>
   </div>
   )
})
    return (
        <div>
            <Helmet>
                <title>Cek Ajuan OJT/PKL</title>
            </Helmet>

            <Navbar active={"Pendaftaran"} />

            <div className="mt-16 px-32 flex flex-col items-center justify-center w-cover h-[520px] bg-screen bg-no-repeat" style={{ background: "url('/daftar-banner.png')", backgroundSize: "cover", backgroundRepeat: "no-repeat" }}>
                <b className="break-normal text-6xl text-white animate-fade animate-once animate-delay-100">Pendaftaran Calon Peserta PKL</b>
                <span className="mt-6 text-white mt-6 text-white animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">Silahkan ikuti dan lengkapi formulir pendaftaran di bawah ini dan pastikan data yang kalian isikan sudah benar</span>
            </div>

            {/* {periksa ? <FormPeriksa dataKeilmuan={dataKeilmuan} dataDivisi={dataDivisi} showPendaftaran={setPendaftaran} showPeriksa={setPeriksa} /> : null} */}
            {pendaftaran ? <FormPendaftaran dataKeilmuan={dataKeilmuan} dataDivisi={dataDivisi} jumlahAnggota={anggota} showPendaftaran={setPendaftaran} showTrainee={setTrainee} setAnggota={setAnggota} /> : null}
            {trainee ? <FormTrainee jumlahAnggota={anggota} /> : null}

            <Footer />
        
            {showModal ? (
        <>
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true ">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto ">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 ">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg min-h-20">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Silahkan cek kuota yang tersedia sesuai divisi yang ingin anda daftarakan.</h3>
              <div class="mt-2">

                <p class="text-sm text-gray-500">{arr}</p>
                
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={() => setShowModal(false)}
          class="inline-flex w-full justify-center rounded-md border 
          border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm 
          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
          sm:ml-3 sm:w-auto sm:text-sm">Saya paham</button>

        </div>
      </div>
    </div>
  </div>
</div>
        </>
      ) : null}

        </div>
        
    )
}