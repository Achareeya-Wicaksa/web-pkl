import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet";
import Searchbar from "../components/Searchbar";
import Sidebar from "../components/Sidebar";
import { useTable } from "react-table"
import Table from "../components/Table";
import { loginCheck } from "../utils";
import axios from "axios";
import { DownloadTableExcel, downloadExcel } from 'react-export-table-to-excel';
import { useRef } from "react";


  
  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

export default function Pengajuan () {
    const [ month, setMonth ] = useState(new Date().getMonth()+1);
    const [ userInfo, setUserInfo ] = useState();
    const [ data, setData ] = useState([]);
    const [ active, setActive ] = useState("Diproses");
    const [showModal, setShowModal] = React.useState(false);

    // const [ submissions, setSubmissions ] = useState([]);

    const tableRef = React.createRef()

    useEffect(() => {
      loginCheck ()
        setUserInfo({
            Photo: "AP logo 1.png", 
            name: "",
            department: ""
        });

        console.log("ref", tableRef.current)
        
        //axios
        //  .get(`${process.env.REACT_APP_API_HOST}/submissions`)
        //  .then((response) => {
        //    // console.log(response.data)
        //    
        //    setData(response.data.submission) orinya cuma line ini
        //    //setData(response.data.submission.filter((e) => {
        //    //    return e.created_at == "2023-01-11T11:01:34.865+07:00"//dislice
        //     // }))
        //  })
        //  .catch(console.error)
        
    }, []);

    function getAllSubmissions() {
        axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
          .then((response) => {
            let accepted = response.data.submission.filter((e) => {
                return e.status == "Diproses"||e.status == "Diterima"||e.status == "Ditolak"||e.status == "Dibatalkan"
            })
            setData(accepted)
            //console.log(accepted)
  
          })
      }

    function filteredList() {
        if(month > 0 && month < 13) {
          axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
          .then((response) => {
            let accepted = response.data.submission.filter((e) => {
              if(e.status == "Diterima"||e.status == "Diproses"||e.status == "Ditolak") {
                let dateStart = new Date(e.start_date);
                let dateEnd = new Date(e.end_date);
                let now = new Date(new Date().getFullYear()+"-"+month+"-01");
                // console.log(new Date().getFullYear()+"-"+month+"-01")
                if(now.getFullYear() >= dateStart.getFullYear() && now.getFullYear() <= dateEnd.getFullYear()) {
                  if(now.getMonth() >= dateStart.getMonth() && now.getMonth() <= dateEnd.getMonth()) {
                    console.log(e.id)
                    return e;
                    //delete e
                  }
                }
                
                // if(now >= dateStart && now <= dateEnd) {
                //   return e;
                // }
              }
            })
            setData(accepted)
            // console.log(accepted)
          })
        } else {
          getAllSubmissions()
        }
      }

    // useEffect(() => {
    //   if(active === "proses") {
    //     setData([
    //       {
    //         regis: 'AP121',
    //         nama: 'Dio Farrel',  
    //         jumlah: '3',
    //         tanggal: '24-10-2022, 12.43',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November - Januari',
    //       },
    //       {
    //         regis: 'AP122',
    //         nama: 'Galih Arum',  
    //         jumlah: '4',
    //         tanggal: '24-10-2022, 12.44',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November',
    //       },
    //     ]) 
    //   } else if(active === "diterima") {
    //     setData([
    //       {
    //         regis: 'AP121',
    //         nama: 'Dio Farrel',  
    //         jumlah: '3',
    //         tanggal: '24-10-2022, 12.43',  
    //         unit: 'Teknologi Informasi & Komunikasi',
    //         bulan: 'November - Januari',
    //       },
    //     ]) 
    //   } else {
    //     setData([])
    //   }
    // }, [active])

    function handleDelete(){
      if(month > 0 && month < 13) {
        axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
        .then((response) => {
          let accepted = response.data.submission.filter((e) => {
            if(e.status == "Diterima"||e.status == "Diproses"||e.status == "Ditolak") {
              let dateStart = new Date(e.start_date);
              let dateEnd = new Date(e.end_date);
              let now = new Date(new Date().getFullYear()+"-"+month+"-01");
              // console.log(new Date().getFullYear()+"-"+month+"-01")
              if(now.getFullYear() >= dateStart.getFullYear() && now.getFullYear() <= dateEnd.getFullYear()) {
                if(now.getMonth() >= dateStart.getMonth() && now.getMonth() <= dateEnd.getMonth()) {
                 //console.log(e.id)
                  //return e;
              axios
      .delete(
        `${process.env.REACT_APP_API_HOST}/submissions/${e.id}`
      )
      .then((response) => {
        filteredList()
      });          
                }
              }
            }
          })
        })
      }
       setShowModal(false)

      //console.log(montext)

    }

    function handleMonthChange(e) {
        if(month != "*") setMonth(Number.parseInt(e)) 
        else getAllSubmissions()
      }
      
      useEffect(() => {
        filteredList()
      }, [month])

      function handleText(x) {
        if(x!=""){
          axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
            .then((response) => {
              let accepted = response.data.submission.filter((e) => {
                //return e.status == "Diterima"
                return e.name.toLowerCase().includes(x.toLowerCase()) 
              })
              setData(accepted)
              //console.log(accepted)
    
            })
        }
        else{
          axios.get(`${process.env.REACT_APP_API_HOST}/submissions`)
          .then((response) => {
            let accepted = response.data.submission.filter((e) => {
                return e.status == "Diproses"||e.status == "Diterima"||e.status == "Ditolak"||e.status == "Dibatalkan"
            })
            setData(accepted)
            //console.log(accepted)
  
          })
        }
    
         // console.log(x)
        }

    let ddopt = [
      {
          text: "January",
          value: "1"
      },
      {
          text: "February",
          value: "2"
      },
      {
          text: "Maret",
          value: "3"
      },
      {
          text: "April",
          value: "4"
      },
      {
          text: "Mei",
          value: "5"
      },
      {
          text: "Juni",
          value: "6"
      },
      {
          text: "Juli",
          value: "7"
      },
      {
          text: "Agustus",
          value: "8"
      },
      {
          text: "September",
          value: "9"
      },
      {
          text: "Oktober",
          value: "10"
      },
      {
          text: "November",
          value: "11"
      },
      {
          text: "Desember",
          value: "12"
      }
    ]

    let subtitle;
  const [setIsOpen] = React.useState(false);

    function handleExport() {
        const month = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"]
        let exportData = [];
        for(let i = 0; i< data.length; ++i) {
            let dt = new Date(data[i].created_at)
            exportData.push({
                code_submission: data[i].code_submission,
                name: data[i].name,
                total_trainee: data[i].total_trainee,
                created_at: `${dt.getDate()} ${month[dt.getMonth()]} ${dt.getFullYear()}`,
                division: data[i].division.name,
                month: `${month[new Date(data[i].start_date).getMonth()]} - ${month[new Date(data[i].end_date).getMonth()]}`,
                status: data[i].status
            })
        }
        downloadExcel({
            fileName: `pengajuan_${new Date().getTime()}`,
            sheet: "Pengajuan",
            tablePayload: {
                header: ["No. Registrasi", "Nama", "Jumlah", "Tanngal Pengajuan", "Unit Kerja", "Bulan", "Status"],
                body: exportData
            }
        })
    }

      for(let i=0;i<ddopt.length;i++){
        if(month==ddopt[i].value){
          var montext=ddopt[i].text
        }
      }

    

      

    return (
        <div>
            <Helmet>
                <title>Home - Angkasa Pura</title>
            </Helmet>
            <div className="h-screen w-screen bg-sky-300 p-5 lg:p-12 lg:py-6">
                {
                userInfo ?
                <div className="flex flex-row gap-3">
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-5 w-48 h-48 flex flex-col items-center justify-center">
                            <img src={userInfo.Photo} alt="logo" />
                            <b className="mt-5"></b>
                            <b>{userInfo.name}</b>
                            <span className="text-slate-600">{userInfo.department}</span>
                        </div>
                        <Sidebar active={"Pengajuan"} />
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        <div className="bg-white rounded-xl p-5 flex flex-col items-start h-48 gap-1">
                            <div className="flex justify-between w-full">
                                <div className="flex flex-col gap-1">
                                    <b className="text-2xl">Halo {userInfo.name.split(" ")[0]}!</b>
                                    <span className="text-slate-600">Selamat datang kembali!</span>
                                </div>
                                <button onClick={handleExport} className="bg-blue-600 rounded-lg text-white px-3 py-1 h-fit">Export</button>
                            </div>
                            
                            <Searchbar useDropdown={true} dropdownOptions={ddopt} className="mt-5" onMonthChange={handleMonthChange} textchange={handleText}/>
                            
                        </div>
                        <div className="bg-white rounded-xl h-[500px]">
                          <div className="flex flex-row justify-around">
                            <button className={`py-4 w-full ${active === "Diproses" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Diproses")}>Proses</button>
                            <button className={`py-4 w-full ${active === "Diterima" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Diterima")}>Diterima</button>
                            <button className={`py-4 w-full ${active === "Ditolak" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Ditolak")}>Ditolak</button>
                            <button className={`py-4 w-full ${active === "Dibatalkan" ? "border-gray-600 border-b-4" : ""}`} onClick={()=>setActive("Dibatalkan")}>Dibatalkan</button>
                          </div>
                          <Table className="bg-white rounded-xl overflow-y-auto max-h-[300px]" data={data} ref={tableRef} active={active}
                          
                          />
                          
                        </div>
                        
      {showModal ? (
        <>
          <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">Hapus data bulan {montext} ?</h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Apakah anda yakin ingin menghapus data bulan {montext} ?, pastikan anda telah melakukan export data pada bulan {montext} ini !</p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" onClick={handleDelete}
          class="inline-flex w-full justify-center rounded-md border 
          border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm 
          hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 
          sm:ml-3 sm:w-auto sm:text-sm">Hapus</button>
          <button type="button" onClick={() => setShowModal(false)} class="mt-3 inline-flex w-full justify-center rounded-md 
          border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 
          shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 
          focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Batalkan</button>
        </div>
      </div>
    </div>
  </div>
</div>
        </>
      ) : null}
                                <button onClick={() => setShowModal(true)} className="bg-red-600 rounded-lg text-white px-3 py-1 h-fit">Hapus bulan {montext}</button>

                    </div>
                </div>
                : "Loading..."
            }
            </div>
        </div>
    )
}