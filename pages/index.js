import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import PageTitle from '../components/pagetitle'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/get-promo', fetcher) 
    return (
        <div>
            <p className='mt-12 text-center'>
            O restaurante X sempre procura atender melhor seus clientes.<br />
                Por isso, estamos sempre abertos a sua opnião.
            </p>
            <PageTitle title='Home'/>
            <div className='text-center my-12'>
                 <Link href='/pesquisa'>
                     <a className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar sua opnião ou sugestão</a>
                 </Link>
            </div>
            {!data && <p>Carregando...</p>}
            {!error && data && data.showCoupon &&
            <p className='my-12 text-center'>
                {data.message}
            </p>
           }
        </div>
    )    
}

export default Index