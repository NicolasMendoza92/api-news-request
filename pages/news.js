
import Layout from "@/components/Layout";
import Spinner from "@/components/Spinner";
import SearchIcon from "@/components/icons/SearchIcon";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const defaultEndpoint = "https://newsapi.org/v2/top-headlines"


export default function NewsPage() {

  const [news, setNews] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [country, setCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  
  useEffect(() => {
    getGeneralNews()
  },[page, category, keyword, country] )

  async function getGeneralNews() {
    try {
      const config = {
        params: {
          apiKey: '22151cac8ef24f039026871a8cc0ee62',
          q: 'world',
          category: category,
          country: country,
          q: keyword,
          page: page,
        },
      };
      const response = await axios.get(`${defaultEndpoint}`, config);
      const api_news = response.data.articles;
      setNews(api_news)
    } catch (error) {
      console.log('Hubo un error en la consulta del servidor', error)
    }
  }


  const previusDisabled = page === 1;
  const nextDisabled = page === 3;
  // guardamos las posiciones inciales y las finales esto es para usar despues al metodo slice de un array
  const limit = 8;
  // arranca en cero y le ponemos un limit y nos hace como una formula e ir avanzando en las noticias que quiero 
  const initial = 0 + page * limit - limit;
  const last = initial + limit;

  const newsPaginated = news.slice(initial, last);


  return (
    <div>
      <Layout>
        <form className="flex flex-wrap justify-center items-center gap-3">
          <div>
            <label className="p-2 font-bold" htmlFor="category">Category</label>
            <select className="border border-gray-200 bg-zinc-100/4 py-2 px-2 me-2" name="category" id="category" value={category} onChange={e => setCategory(e.target.value)}>
              <option value="general">-</option>
              <option value="business">Business</option>
              <option value="entertainment">Entretainment</option>
              <option value="general">General</option>
              <option value="health">Health</option>
              <option value="science">Science</option>
              <option value="sports">Sports</option>
              <option value="technology">technology</option>
            </select>
          </div>
          <div>
            <label className="p-2 font-bold" htmlFor="category">Country</label>
            <select className="border border-gray-200 bg-zinc-100/4 py-2 px-2 me-2" name="category" id="category" value={country} onChange={e => setCountry(e.target.value)}>
              <option value="">-</option>
              <option value="ar">Argentine</option>
              <option value="au">Australia</option>
              <option value="br">Brazil</option>
              <option value="cn">China</option>
              <option value="fr">France</option>
              <option value="de">Germany</option>
              <option value="in">India</option>
              <option value="it">Italy</option>
              <option value="jp">Japan</option>
              <option value="mx">Mexico</option>
              <option value="tr">Turkey</option>
              <option value="za">South Africa</option>
              <option value="gb">United Kingdom</option>
              <option value="us">United States</option>
            </select>
          </div>
          <div className="flex items-center">
            <input className="px-2 py-2 me-2 border border-gray-200 bg-zinc-100/40" type="search" placeholder="keywords" aria-label="Search" value={keyword} onChange={e => setKeyword(e.target.value)} />
            <span className="bg-blue-500 rounded-lg px-3 py-3 flex gap-1 text-white "> <SearchIcon /> </span>
          </div>
         
        </form>
        
        {newsPaginated.length === 0 && (
          <div className="grid grid-cols-1 items-center text-center gap-3 mx-auto p-20 ">
            <h1 className="text-5xl my-3 font-bold"> Ops :( </h1>
            <p className="text-2xl my-3 mx-2"> We have not found any such news</p>
          </div>
        )}
        {isLoading && (
          <div className="w-full flex justify-center py-4">
            <Spinner />
          </div>
        )}
        <div className="p-10 grid grid-cols-1 gap-4 justify-center md:grid-cols-3 lg:grid-cols-4">
          {newsPaginated.length > 0 && newsPaginated.map(n => (
              <div key={n.url} className='max-w-sm rounded-2xl overflow-hidden flex flex-col shadow-lg mx-auto'>
                <img className='w-full' src={n.urlToImage} alt={'notice_img.link'} />
                <div className=' px-6 py-4'>
                  <span className='text-xs font-medium text-gray-400 mb-1'>{n.publishedAt}</span>
                  <div className='text-lg font-medium mb-2'>
                    <Link className="no_underline text-gray-900" target="_blank" href={n.url}>{n.title}</Link>
                  </div>
                  <p className='text-gray-700 text-xs'>
                    {n.description}
                  </p>
                </div>
                <div className='mt-auto mb-3 px-6 pt-4 pb-2'>
                  <Link target="_blank" href={n.url} className='bg-black text-white rounded-full px-3 py-3 hover:bg-gray-500'>Read more</Link>
                </div>
              </div>
          ))}
        </div>
        {newsPaginated.length > 0 ? (
          <div className="flex justify-center items-center">
            {page === 1 ? <button className="m-2 bg-gray-400 rounded-md px-2 py-2 text-white" onClick={() => { setPage(page - 1) }} disabled={previusDisabled}>Previus</button> : <button className="m-2 bg-blue-500 rounded-md px-2 py-2 text-white" onClick={() => { setPage(page - 1) }} disabled={previusDisabled}>Previus</button>}
            <p className="">{page} of 3</p>
            {page === 3 ? <button className="m-2  bg-gray-400 rounded-md px-2 py-2 text-white" onClick={() => { setPage(page + 1) }} disabled={nextDisabled}>Next</button>:<button className="m-2  bg-blue-500 rounded-md px-2 py-2 text-white" onClick={() => { setPage(page + 1) }} disabled={nextDisabled}>Next</button>} 
          </div>
        ) : null}

      </Layout>
    </div>
  );
}
