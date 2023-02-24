import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import { Header } from '@/components/Header';
import { TopBar } from '@/components/TopBar';

import { HomeHeroCategories } from '@/components/HomeHeroCategories';
import { Categories } from '@/models/Categories';

import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { AdvantageSection } from '@/components/AdvantageSection';
import { GroupedProducts, groupProductsByCategory } from '@/utils/groupProductsByCategory';
import { HomeProductsGrid } from '@/components/HomeProductsGrid';

import bannerNewSeason from '/public/banner-new-season.jpg';
import bannerSale from '/public/banner-sale.jpg';
import { CenteredLabel } from '@/components/CenteredLabel';
import { PromoBanner } from '@/components/PromoBanner';

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
};

type Props = {
  products: Product[];
  categories: Categories[];
  productsGroupedByCategory: GroupedProducts;
};

export default function Home({ products, categories, productsGroupedByCategory }: Props) {
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
        <Container
          size={{
            lg: 'lg',
          }}
        >
          <HomeHeroCategories categories={categories}></HomeHeroCategories>
          <AdvantageSection />
        </Container>

        <Container
          maxW={{
            base: '100%',
            md: '1110px',
          }}
          paddingX="0"
        >
          {Object.entries(productsGroupedByCategory).map(([category, products]) => {
            return (
              <Box key={category} marginBottom="4rem">
                <Heading
                  as="h2"
                  size="md"
                  textTransform="uppercase"
                  margin={{
                    base: '0 0 1rem 1rem',
                    md: '0 0 1.5rem',
                  }}
                >
                  {category}
                </Heading>
                <HomeProductsGrid products={products} />
              </Box>
            );
          })}
        </Container>

        <Container
          size={{
            lg: 'lg',
          }}
        >
          <SimpleGrid
            minChildWidth="320px"
            spacing={{
              base: '1rem',
              md: '2rem',
            }}
          >
            <PromoBanner image={bannerNewSeason}>
              <Text fontSize="sm" color="gray.500">
                New Season
              </Text>
              <Text fontSize="lg" fontWeight="bold" whiteSpace="nowrap">
                lookbook collection
              </Text>
            </PromoBanner>
            <PromoBanner image={bannerSale}>
              <Text fontSize="sm" color="gray.500">
                Sale
              </Text>
              <Text fontSize="lg" fontWeight="bold" whiteSpace="nowrap">
                Get UP to{' '}
                <Text as="span" color="red">
                  50% off
                </Text>
              </Text>
            </PromoBanner>
          </SimpleGrid>
        </Container>
      </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const products = await fetch('https://fakestoreapi.com/products').then((res) => res.json());
  const categories = await fetch('https://fakestoreapi.com/products/categories').then((res) => res.json());

  const productsGroupedByCategory = groupProductsByCategory(products);

  return {
    props: {
      products,
      categories,
      productsGroupedByCategory,
    },
  };
}
