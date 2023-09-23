import {
	PageHeader,
	PageHeaderDescription,
	PageHeaderHeading
} from '@/components/page-header'
import { Shell } from '@/components/shell'
import React from 'react'

export default function page() {
	return (
		<Shell>
			<PageHeader
				id='subcategory-page-header'
				aria-labelledby='subcategory-page-header-heading'
			>
				<PageHeaderHeading size='sm'>
					Estos son los mejores restaurants de la ciudad
				</PageHeaderHeading>
				<PageHeaderDescription size='sm'>
					Descubri todo lo que tienen para ofrecer ✨
				</PageHeaderDescription>
			</PageHeader>
		</Shell>
	)
}
