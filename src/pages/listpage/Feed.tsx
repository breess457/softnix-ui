import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import ModelCreate from "../../components/Modelcreate";

const FeedPage = () => {
    const [getdata, setGetdata] = useState<any>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [model , setModel] = useState<boolean>(false)
    const fetchFeed = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/data?page=${page}&limit=21`, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการเรียกข้อมูล");
            const responsedata = await response.json();
            if (responsedata.status === 201) {
                setGetdata(responsedata?.data);
                setTotalPages(responsedata?.totalPage)
            }
        } catch (e) {
            console.log(e);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchFeed();
        }
    }, [page]);
    
    return (
        <div className="max-w-screen-xl flex flex-col items-center justify-between mx-auto p-4">
            <div className="flex w-full flex-row items-center justify-between mx-auto">
                <h1>Feed ทะเบียน รถ</h1> 
                <button 
                    className="ml-auto px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300" 
                    type="button"
                    onClick={()=>setModel(true)}
                ><FontAwesomeIcon icon={faPlus}/> add</button>
            </div>
            <div aria-label="group of cards" className="focus:outline-none w-full">
                <div className="items-center justify-center w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                    {getdata && getdata.map((data:any,index:number)=>(
                        <div aria-label="card 1" className="focus:outline-none w-full m-2 ml-2 bg-white  p-3 shadow rounded" key={index}>
                            <div className="flex items-center border-b border-gray-400 dark:border-gray-700">
                                
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full">
                                        <p className="focus:outline-none text-xl font-medium leading-5 text-gray-800 dark:text-white ">Varity : {data?.Seed_Varity}</p>
                                        <p className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-200 ">stock sale : {data?.Seed_Stock2Sale}</p>
                                    </div>
                                    {/* <div role="img" aria-label="bookmark">
                                       <svg  className="focus:outline-none dark:text-white text-gray-800" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.5001 4.66667H17.5001C18.1189 4.66667 18.7124 4.9125 19.15 5.35009C19.5876 5.78767 19.8334 6.38117 19.8334 7V23.3333L14.0001 19.8333L8.16675 23.3333V7C8.16675 6.38117 8.41258 5.78767 8.85017 5.35009C9.28775 4.9125 9.88124 4.66667 10.5001 4.66667Z" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                    </div> */}
                                </div>
                            </div>
                            <div className="px-2 border-b pb-2 border-gray-400 my-3">
                                <div className="flex grid grid-cols-2">
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">Season : {data?.Seed_Season}</p>
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">Year week : {data?.Seeds_YearWeek}</p>
                                </div>
                                <div className="flex grid grid-cols-2">
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">province : {data?.Seed_RDCSD}</p>
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">Year : {data?.Seed_Year}</p>
                                </div>
                                <div className="flex grid grid-cols-2">
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">RepDate : {data?.Seed_RepDate}</p>
                                    <p className="focus:outline-none text-sm leading-5 text-gray-600 dark:text-gray-200 ">Crop Year : {data?.Seed_Crop_Year}</p>
                                </div>
                            </div>
                            <div className="px-2">
                                เพิ่มโดย {data?.User_id ? "ป" : "สาธารณะ"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
      {model ? <ModelCreate  setCreateModel={setModel} fetchFeed={fetchFeed}/> : null}
    </div>
    );
}

export default FeedPage;