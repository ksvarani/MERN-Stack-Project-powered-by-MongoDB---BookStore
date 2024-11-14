import React from 'react'
import { Banner } from './components/Banner'
import { BestSellerBooks } from './components/BestSellerBooks'
import { FavBook } from './components/FavBook'
import { PromoBanner } from './components/PromoBanner'
import { OtherBooks } from './components/OtherBooks'
import { Reviews } from './components/Reviews'

export const Home = () => {
  return (
    <div>
      <Banner/>
      <BestSellerBooks/>
      <FavBook/>
      <PromoBanner/>
      <OtherBooks/>
      <Reviews/>
    </div>
  )
}
