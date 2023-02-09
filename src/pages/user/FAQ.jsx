import { Helmet } from "react-helmet";
import Navbar from "../../components/Navbar";

export default function FAQ() {

    return (
        <div>
            <Helmet>
                <title>FAQ</title>
            </Helmet>

            <Navbar active={"FAQ"} />
            
            <div>
      <section class="text-gray-700">
        <div class="container px-5 py-24 mx-auto mt-20">
          <div class="text-center mb-20">
            <h1 class="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4 animate-fade animate-once animate-delay-100">
              Frequently Asked Question
            </h1>
            <p class="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto animate-fade animate-once animate-delay-100">
              The most common questions about how our business works and what
              can do for you.
            </p>
          </div>
          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Berapa lama minimal melakukan praktik kerja lapangan pada PT.Angkasa Pura 1 ?
                </summary>

                <span>
                Waktu minimal melakukan praktik kerja lapangan adalah 2 bulan.
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Berapakah jumlah minimal mahasiswa untuk dapat melakukan praktik kerja lapangan pada PT.Angkasa Pura 1 ?
                </summary>

                <span>
                Minimal anggota untuk melakukan praktik kerja lapangan adalah 2 orang.
                </span>
              </details>
              <details class="mb-4">
                <summary class=" font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Berapa lama surat ajuan akan dibalas / dikonfirmasi?
                </summary>

                <span>
                Surat ajuan akan di proses sesuai antrian serta minimal 7 hari kerja.
                </span>
              </details>
            </div>
            <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Apakah ada periode tertentu dalam menerima mahasiswa PKL?
                </summary>

                <span class="px-4 py-2">
                Tidak ada, selama divisi yang bersangkutan bersedia menerima maka ajuan PKL akan dipertimbangkan. 
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Project seperti apa yang akan dikerjakan mahasiswa PKL?
                </summary>

                <span class="px-4 py-2">
                Project akan diberitahukan ketika ajuan sudah di terima. 
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 break-normal text-black animate-fade-down animate-once animate-ease-linear animate-normal animate-delay-700">
                Bagaimana jika surat ajuan yang di kirimkan ternyata salah?
                </summary>

                <span class="px-4 py-2">
                Apabila surat ajuan yang dikirimkan salah maka permohonan PKL tidak akan di proses.
                </span>
              </details>
            </div>
          </div>
        </div>
      </section>
    </div>
    </div>
        
    )
}