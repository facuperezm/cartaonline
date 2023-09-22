import Link from 'next/link'

import { Navigation } from 'lucide-react'

import { cn } from '@/lib/utils'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { buttonVariants } from '@/components/ui/button'

export async function CategoryCard() {
	return (
		<Link
			href={`/categories`}
			className='relative overflow-hidden border rounded-md group'
		>
			<AspectRatio ratio={16 / 9}>
				<div className='absolute inset-0 z-10 transition-colors bg-zinc-950/70 group-hover:bg-zinc-950/60' />
				<img
					src='https://images.unsplash.com/photo-1556918936-3e73b945d24f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3132&q=80'
					className='object-cover transition-transform group-hover:scale-105'
					sizes='(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw'
					fill
					priority={true}
				/>
			</AspectRatio>
			<div className='absolute z-20 flex flex-col inset-4'>
				<div className='flex items-start justify-between space-x-4'>
					<div
						className={cn(
							buttonVariants({
								size: 'icon',
								className:
									'pointer-events-none h-8 w-8 bg-zinc-100 text-zinc-950'
							})
						)}
						aria-hidden='true'
					>
						<Navigation />
					</div>
					<p className='text-sm text-zinc-200'>123 items</p>
				</div>
				<h3 className='mt-auto text-xl font-medium capitalize text-zinc-200'>
					Puerto Iguazú
				</h3>
			</div>
			<span className='sr-only'>This is the title</span>
		</Link>
	)
}
