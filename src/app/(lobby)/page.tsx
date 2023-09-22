import { CategoryCard } from '@/components/card'
import { Shell } from '@/components/shell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'

export default function Home() {
	return (
		<Shell className='gap-12'>
			<section
				id='hero'
				className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28'
			>
				<h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]'>
					Bienvenido a Carta Online
				</h1>
				<Balancer>
					<p className='text-base text-muted-foreground md:text-lg'>
						La manera mas facil de administrar tu negocio desde cualquier lugar.
						Deja que la gente rankee tu comida rica rica
					</p>
				</Balancer>

				<div className='flex flex-wrap items-center justify-center gap-4'>
					<Link href='/company' className={cn(buttonVariants())}>
						Buy now!
						<span className='sr-only'>buy now</span>
					</Link>
					<Link
						href='/companies'
						className={cn(buttonVariants({ variant: 'outline' }))}
					>
						Publica tu restaurant{' '}
						<span className='sr-only'>publica tu restaurant aca</span>
					</Link>
				</div>
			</section>
			<section className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
				<CategoryCard />
			</section>
		</Shell>
	)
}
