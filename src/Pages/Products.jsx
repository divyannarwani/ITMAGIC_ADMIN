import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Products() {

  const [name, setName] = useState('')
  const [image, setImage] = useState([])

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image[0]);

    try {
      await fetch("https://itmagic-backend.vercel.app/api/v1/addProduct", {
        method:"POST",
        body: formData
      })
      alert("PRODUCT ADDED SUCCESSFULLY");
      fetchTableData();
      setName("")
      setImage([]);
      
    } catch (error) {
      console.error('Error adding logo', error);
    }
  }

  const [tableData, setTableData] = useState([])

  const fetchTableData = async () => {
    try {
      const response = await fetch("https://itmagic-backend.vercel.app/api/v1/getProducts")
      const result = await response.json()
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  }

  const handleDelete = async (id) => {
    
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete){
      try {
        const response = await axios.delete(`https://itmagic-backend.vercel.app/api/v1/deleteProduct/${id}`);
        if (response.status === 200){
          alert("Item deleted successfully.")
          fetchTableData()
        }
      } catch (error) {
        console.error("Error deleting the item:", error);
        alert("Failed to delete the item. Please try again.")
      }
    }
  }

  useEffect( () => {
    fetchTableData()
  }, [])

  return (
    <>
      <div className='text-3xl px-14 pt-4 text-gray-900 text-opacity-50'>
         MANAGE PRODUCT's 
      </div>
      <div>
        <div className='relative px-4 py-8 bg-white rounded-xl shadow-xl'>

              <hr />

          <section className="justify-self-start bg-white" >
              <h2 className="relative my-8 left-10 top-2 text-2xl font-bold text-gray-900 ">ADD NEW PRODUCT</h2>
              <div className="relative left-10 top-2 mx-auto max-w-2xl">
                  <form onSubmit={handleSubmit}>
                      <div className="flex gap-8 mb-12">
                          <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                              <input 
                                type="text" 
                                placeholder="Type product name" 
                                value={name} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1.5"
                                required
                                onChange={(e) => setName(e.target.value)}
                              />
                          </div>
                          <div>
                              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Product Image</label>
                              <input 
                                type="file" 
                                placeholder="Product brand" 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1" 
                                required
                                onChange={(e) => setImage(e.target.files)}
                              />
                          </div>
                          <button 
                            type="submit" 
                            className="inline-flex items-center px-5  mt-4 sm:mt-6 text-l font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-gray-800"
                          >
                              ADD
                          </button>
                      </div>
                  </form>
              </div>
          </section>

               <hr/>

          <h2 className="relative my-8 left-10 text-2xl font-bold text-gray-900">LIST OF PRODUCTS</h2>

          <div className="relative ml-5 overflow-x-auto shadow-md sm:rounded-lg mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-gray-400">
                  <thead className="text-xs text-white uppercase bg-gray-700">
                      <tr>
                          <th scope="col" className="px-16 py-3">
                              Sr. no.
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Name
                          </th>
                          <th scope="col" className="px-16 py-3">
                              Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Delete
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      {tableData.map((row, index) => (
                        <tr key={index} className="bg-white border-b hover:bg-gray-50">
                          <td className="p-4">
                              <p className="text-left px-16 font-semibold text-gray-900 ">{index+1}</p>
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 ">
                              {row.name}
                          </td>
                          <td className="p-4">
                              <img src={row.image} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
                          </td>
                          <td className="px-6 py-4">
                              <Link onClick={() => handleDelete(row._id)} className="font-medium text-red-600 hover:underline">Remove</Link>
                          </td>
                      </tr>
                      ))}
                  </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Products