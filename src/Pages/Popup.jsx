import React, {useEffect, useState} from 'react'

function Popup() {
  
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState([])

  // DONT TOUCH THIS FUNCTION 
  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image[0]);

    try {
      await fetch("https://itmagic-backend.onrender.com/api/v1/editPopup", {
        method: "PATCH",
        body: formData
      });
      alert('POPUP UPDATED SUCCESSFULLY!')
      fetchTableData();
      setName("");
      setDescription("");
      setPrice(0);
      setImage([])
    } catch (error) {
      console.error('Error updating popup', error);
    }
  }

  const [tableData, setTableData] = useState({})

  const fetchTableData = async () => {

    setLoading(true);
    try {
      const response = await fetch("https://itmagic-backend.onrender.com/api/v1/getPopup");
      const result = await response.json();
      setTableData(result.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect( () => {
    fetchTableData()
  }, [])

  return (
    <>
      <div className='text-3xl px-14 pt-4 text-gray-900 text-opacity-50'>
         MANAGE POPUP SECTION 
      </div>
      <div>
        <div className='relative px-4 py-8 bg-white rounded-xl shadow-xl'>

          <div className="relative ml-5 overflow-x-auto shadow-md sm:rounded-lg mt-4 mb-8">
            {loading ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : (
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-gray-400">
                  <thead className="text-xs text-white text-center uppercase bg-gray-700">
                      <tr>
                          <th scope="col" className="px-16 py-3">
                              Key
                          </th>
                          <th scope="col" className="px-16 py-3">
                              Value
                          </th>
                      </tr>
                  </thead>
                  <tbody className='text-center'>
                      <tr className="bg-white border-b hover:bg-gray-50 ">
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">NAME</p>
                        </td>
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">{tableData.name}</p>
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50 ">
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">DESCRIPTION</p>
                        </td>
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">{tableData.description}</p>
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50 ">
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">PRICE</p>
                        </td>
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">{tableData.price}</p>
                        </td>
                      </tr>
                      <tr className="bg-white border-b hover:bg-gray-50 ">
                        <td className="p-4">
                          <p className="px-16 font-semibold text-gray-900 ">IMAGE</p>
                        </td>
                        <td className="p-4">
                          <img src={tableData.image} className="w-16 md:w-32 max-w-full max-h-full justify-self-center" alt="Apple Watch" />
                        </td>
                      </tr>
                  </tbody>
              </table>
            )}
              
          </div>

          <hr/>

          <section className="justify-self-start bg-white" >

              <h2 className="relative my-8 left-10 top-2 text-2xl font-bold text-gray-900 ">UPDATE DATA</h2>
              <div className="relative left-10 top-2">
                  <form onSubmit={handleSubmit}>
                      <div className="grid gap-x-8 gap-4 mb-12">
                          <div className='flex gap-4'>
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Price</label>
                                <input 
                                  type="Number" 
                                  placeholder="Type product price" 
                                  value={price} 
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1.5"
                                  required
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                          </div>
                          <div>
                              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Product Description</label>
                              <textarea
                                type="text" 
                                placeholder="Type product description" 
                                rows="5"
                                value={description} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2 py-1"
                                required
                                onChange={(e) => setDescription(e.target.value)}
                              >
                              </textarea> 
                          </div>
                          
                          <div>
                              <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
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
                            className="inline-flex items-center justify-self-end text-l font-medium text-center text-white bg-gray-700 rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-gray-800 px-4 py-2"
                          >
                              UPDATE
                          </button>
                      </div>
                  </form>
              </div>
          </section>

        </div>
      </div>
    </>
  )
}

export default Popup;