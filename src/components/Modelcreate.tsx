import React, { FormEvent, useState, useContext } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Swal from "sweetalert2"
import { useUser } from "../pages/Pages"


interface PropModel{
    setCreateModel:React.Dispatch<React.SetStateAction<boolean>>
    fetchFeed:()=>void
}

const ModelCreate:React.FC<PropModel> = ({setCreateModel,fetchFeed})=>{
    const {data,loading,token} = useUser()
    console.log({data:data?._id,load:loading,token:token})
    const [isForm, setIsForm] = useState({
        Seed_RepDate:"",
        Seed_Year:"",
        Seeds_YearWeek:"",
        Seed_Varity:"",
        Seed_RDCSD:"",
        Seed_Stock2Sale:"",
        Seed_Season:"",
        Seed_Crop_Year:""
    })
    const handleCreate = async (e:FormEvent)=>{
        console.log(isForm)
        try{
            e.preventDefault()
            const response = await fetch('http://localhost:3001/api/data',{
                method:"POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    Seed_RepDate:isForm.Seed_RepDate,
                    Seed_Year:isForm.Seed_Year,
                    Seeds_YearWeek:isForm.Seeds_YearWeek,
                    Seed_Varity:isForm.Seed_Varity,
                    Seed_RDCSD:isForm.Seed_RDCSD,
                    Seed_Stock2Sale:isForm.Seed_Stock2Sale,
                    Seed_Season:isForm.Seed_Season,
                    Seed_Crop_Year:isForm.Seed_Crop_Year,
                    User_id:data?._id
                })
            })
            if(!response.ok) throw new Error('เกิดข้อผิดพลาดในการเพิ่มข้อมูล')
            const responsedata = await response.json()
            if(responsedata.status === 201){
                Swal.fire({
                    icon:"success",
                    title:"insert success",
                    showConfirmButton:false,
                    timer:1500
                }).then(()=>{
                    setCreateModel(false)
                    fetchFeed()
                })
            }
        }catch(e){
            console.log(e)
        }
    }
    return(
        <div 
            tabIndex={-1}
            className="fixed delay-500 left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
        >
            <div className="relative p-4 w-full max-w-3xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <span className="">สร้างกระทู้</span>
                            <button 
                                type="button" 
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>setCreateModel(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        <form className="w-full" noValidate onSubmit={handleCreate}>
                            <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
                            <div className="w-full">
                                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Varity</label>
                                <input 
                                    type="text" 
                                    placeholder="Seed Varity" 
                                    name="Seed_Varity"
                                    value={isForm.Seed_Varity}
                                    onChange={(e) =>{
                                            setIsForm({
                                                ...isForm,
                                                ['Seed_Varity']:e.target.value
                                            })
                                        }
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seed Stock2 Sale</label>
                                <input 
                                    type="text" 
                                    placeholder="Seed Stock2 Sale" 
                                    name="Seed_Stock2Sale"
                                    value={isForm.Seed_Stock2Sale}
                                    onChange={(e) =>{
                                            setIsForm({
                                                ...isForm,
                                                ['Seed_Stock2Sale']:e.target.value
                                            })
                                        }
                                    }
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                />
                            </div>
                            </div>
                            <div className="gap-2 grid grid-cols-1 md:grig-cols-2 lg:grid-cols-3">
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Season</label>
                                    <input 
                                        type="text" 
                                        placeholder="Season Year" 
                                        name="Seed_Season"
                                        value={isForm.Seed_Season}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seed_Season']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year week</label>
                                    <input 
                                        type="number" 
                                        placeholder="Year week" 
                                        name="Seeds_YearWeek"
                                        value={isForm.Seeds_YearWeek}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seeds_YearWeek']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Province</label>
                                    <input 
                                        type="text" 
                                        placeholder="Province" 
                                        name="Seed_RDCSD"
                                        value={isForm.Seed_RDCSD}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seed_RDCSD']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                            </div>
                            <div className="gap-2 grid grid-cols-1 md:grig-cols-2 lg:grid-cols-3">
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year</label>
                                    <input 
                                        type="number" 
                                        placeholder="Seed Stock2 Sale" 
                                        name="Seed_Year"
                                        value={isForm.Seed_Year}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seed_Year']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RepDate</label>
                                    <input 
                                        type="text" 
                                        placeholder="Seed RepDate" 
                                        name="Seed_RepDate"
                                        value={isForm.Seed_RepDate}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seed_RepDate']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                                <div className="w-full">
                                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Crop Year</label>
                                    <input 
                                        type="text" 
                                        placeholder="Crop Year" 
                                        name="Seed_Crop_Year"
                                        value={isForm.Seed_Crop_Year}
                                        onChange={(e) =>{
                                                setIsForm({
                                                    ...isForm,
                                                    ['Seed_Crop_Year']:e.target.value
                                                })
                                            }
                                        }
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ยืนยันสร้างกระทู้</button>
                                <button 
                                    type="button" 
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    onClick={()=>setCreateModel(false)}
                                >ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelCreate