/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { CopyButton } from '@/components/copy-button'
import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { cn } from '@/lib/utils'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { status } = useStatus()

  const rawBaseUrl =
    (status?.server_address as string | undefined)?.trim() ||
    (typeof window !== 'undefined' ? window.location.origin : '')
  const apiEndpoint = rawBaseUrl ? `${rawBaseUrl.replace(/\/+$/, '')}/v1` : ''

  return (
    <section
      className={cn(
        'flex flex-1 items-center justify-center px-6 py-24 md:py-32',
        props.className
      )}
    >
      <div className='mx-auto flex w-full max-w-md flex-col items-center gap-6 text-center'>
        {apiEndpoint && (
          <div className='border-border bg-card flex w-full items-center justify-between gap-2 rounded-lg border px-4 py-3'>
            <code className='text-foreground/85 truncate font-mono text-xs sm:text-sm'>
              {apiEndpoint}
            </code>
            <CopyButton
              value={apiEndpoint}
              size='icon'
              className='size-7'
              iconClassName='size-3.5'
            />
          </div>
        )}

        <div className='flex flex-wrap items-center justify-center gap-3'>
          {props.isAuthenticated ? (
            <Button
              className='group h-10 px-5 text-sm font-medium'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='group h-10 px-5 text-sm font-medium'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1.5 size-4 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='h-10 px-5 text-sm font-medium'
                render={<Link to='/sign-in' />}
              >
                {t('Sign In')}
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
