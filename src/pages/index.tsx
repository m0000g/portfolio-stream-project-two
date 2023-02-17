import { GetServerSidePropsContext } from "next";
import Head from "next/head"
import Image from "next/image"

import { Header } from "@/components/Header";
import { TopBar } from "@/components/TopBar";

import { HomeHeroCategories } from "@/components/HomeHeroCategories";
import { Categories } from "@/models/Categories";

import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { AdvantageSection } from "@/components/AdvantageSection";
import { ProductCard } from "@/components/ProductCard";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    count: number;
    rate: number;
  };
}

type Props = {
  products: Product[],
  categories: Categories[]
}

export default function Home({ products, categories }: Props) {
  return (
    <>
      <Head>
        <title>eCommerce Project</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <Box marginBottom="2rem">
        <Header />
      </Box>

      <main>
        <Container size={{
          lg: 'lg'
        }}>
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />

          {<SimpleGrid minChildWidth='255px' spacing={"1.85rem"}>
            {products.map(product => {
              return <ProductCard {...product} key={product.id} />
            })}
          </SimpleGrid>}
        </Container>


      </main>
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const products = await fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
  const categories = await fetch("https://fakestoreapi.com/products/categories")
    .then(res => res.json())


  return {
    props: {
      products,
      categories
    }
  }
}
