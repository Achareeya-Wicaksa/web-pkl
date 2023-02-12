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
          </div>
          <div class="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
            <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 animate-fade-down">
                Berapa lama minimal melakukan praktik kerja lapangan pada PT.Angkasa Pura 1 ?
                </summary>

                <span>
                Waktu minimal melakukan praktik kerja lapangan adalah 2 bulan.
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold bg-gray-200 rounded-md py-2 px-4 animate-fade-down animate-delay-500">
                Berapakah jumlah minimal mahasiswa untuk dapat melakukan praktik kerja lapangan pada PT.Angkasa Pura 1 ?
                </summary>

                <span>
                Minimal anggota untuk melakukan praktik kerja lapangan adalah 1 orang.
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 animate-fade-down animate-delay-1000">
                Berapa lama surat ajuan akan dibalas / dikonfirmasi ?
                </summary>

                <span>
                Surat ajuan akan di proses sesuai antrian serta minimal 7 hari kerja.
                </span>
              </details>
            </div>
            <div class="w-full lg:w-1/2 px-4 py-2">
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 animate-fade-down animate-delay-[1500ms]">
                  Apakah dalam kegiatan PKL paa PT. Angkasa pura ini mendapatkan uang saku ? 
                </summary>

                <span class="px-4 py-2">
                Dalam kegiatan PKL maupun Magang pada PT. Angkasa pura ini peserta tidak akan mendapat uang saku.
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 animate-fade-down animate-delay-[2000ms]">
                Apakah peserta diwajibkan memakai seragam ?
                </summary>

                <span class="px-4 py-2">
                Peserta diwajibkan memakai Almamater dari Sekolah maupun instansi masing-masing dari peserta.
                </span>
              </details>
              <details class="mb-4">
                <summary class="font-semibold  bg-gray-200 rounded-md py-2 px-4 animate-fade-down animate-delay-[2500ms]">
                Apakah para peserta akan mendapatkan pembimbing ? 
                </summary>

                <span class="px-4 py-2">
                Mahasiswa akan mendapakan seorang pembimbing, bertujuan untuk mengarahkan serta mengevaluasi jalan nya sebuah proyek yang dikerjakan.
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