import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { Media, Page as PayloadPage } from 'payload-types'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const payload = await getPayloadHMR({ config: configPromise })

function Content({
  block,
}: {
  block: {
    type: string
    version: number
    [k: string]: unknown
  }
}) {
  if (block.type === 'upload') {
    const media = block.value as Media
    return (
      <Image
        src={media.url ?? ''}
        alt={media.text ?? ''}
        width={media.width ?? 100}
        height={media.height ?? 100}
      />
    )
  } else if (block.type === 'text') {
    return <p>{block?.text ?? ''}</p>
  } else if (block.type === 'paragraph') {
    return (
      <>
        {block.children.map((block, index) => (
          <Content key={index} block={block} />
        ))}
      </>
    )
  }
}

const Page = async () => {
  const data = await payload.find({
    collection: 'pages',
    where: {},
  })

  const products = await payload.find({
    collection: 'product',
    where: {
      name: { contains: 'Rubik' },
      price: { less_than: 30 },
      slug: { equals: 'rubiks-cube-2' },
    },
  })

  return (
    <>
      <main>
        {/* <h1>Pages</h1>
        <Button>Yo</Button>
        <ul>
          {data.docs.map((page) => (
            <li key={page.id}>
              <Link href={`/page/${page.id}`}>{page.title}</Link>
              {page.content?.root.children.map((block, index) => (
                <Content key={index} block={block} />
              ))}
            </li>
          ))}
        </ul> */}
        <pre>{JSON.stringify(products, null, 2)}</pre>
        {products.docs.map((product) => (
          <React.Fragment key={product.id}>
            <h1 className="text-3xl font-bold pb-2">
              {product.name} - {product.slug}
            </h1>
            <Image
              src={product.productImage?.url ?? ''}
              alt={product.productImage?.text ?? ''}
              width={product.productImage?.width ?? 100}
              height={product.productImage?.height ?? 100}
            />
            <Carousel>
              <CarouselContent>
                {product.images?.map(({ id, image }) => (
                  <CarouselItem key={id} className="basis-1/3">
                    <Image
                      src={image.url ?? ''}
                      alt={image.text ?? ''}
                      width={image.width ?? 100}
                      height={image.height ?? 100}
                      className="w-full aspect-square object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </React.Fragment>
        ))}
      </main>
    </>
  )
}

export default Page
