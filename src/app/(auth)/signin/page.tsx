import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import Link from 'next/link'

export default function Signin() {
	return (
		<div className='flex justify-center align-center m-auto h-screen'>
			<Card className='m-auto'>
				<CardHeader>
					<CardTitle>Bienvenido a Cartaonline</CardTitle>
					<CardDescription>
						Inicia sesion para administrar tu empresa
					</CardDescription>
				</CardHeader>
				<CardContent className='grid gap-4'>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-background px-2 text-muted-foreground'>
								O inicia sesion con
							</span>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center gap-y-1 text-sm sm:flex-row'>
					<div>
						<span className='text-muted-foreground'>¿No tienes cuenta?</span>
					</div>
					<Link href='/signup' className='font-medium text-primary'>
						Create una cuenta
					</Link>
					<div>
						<Link
							href='/signin/reset-password'
							className='font-medium text-primary'
						>
							Resetea la contra
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
