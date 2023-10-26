'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Avatar from "react-avatar"
import { useBoardStore } from '@/store/BoardStore'
import fetchSuggestion from '@/lib/fetchSuggestion'

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString
  ])
  const [loading, setLoading] = useState<boolean>(false)
  const [suggestion, setSuggestion] = useState<string>("")

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board)
      setSuggestion(suggestion)
      setLoading(false)
    }

    fetchSuggestionFunc();
  }, [board])

  return (
    <header>
      <div className='flex flex-col md:flex-row items-center p-5 rounded-b-2xl '>

        <div className='absolute left-0 top-0 -z-50 bg-gradient-to-br from-pink-500 to-trello h-96 w-full opacity-50 rounded-md filter blur-3xl'></div>

        <Image
          src={"https://links.papareact.com/c2cdd5"}
          alt='trello-logo'
          height={100}
          width={300}
          className='object-contain w-44 md:w-56 max-md:pb-10' />
        <div className='flex items-center gap-5 flex-1 justify-end w-full'>
          {/* Search box */}
          <form className='flex items-center gap-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
            <MagnifyingGlassIcon className='w-6 h-6 stroke-slate-400' />
            <input type="text" placeholder='Search' className='flex-1 outline-none p-2' value={searchString} onChange={e => setSearchString(e.target.value)} />
            <button type='submit' hidden>Search</button>
          </form>

          {/* Avatar */}
          <Avatar name='Rakshit Raj' round color='#0055D1' size='50' className='bg-slate-400' />
        </div>
      </div>

      <div className='flex items-center justify-center px-5 md:py-5'>
        <p className='flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-trello'>
          <UserCircleIcon className={`inline-block h-10 w-10 mr-1 text-trello ${loading && "animate-spin"}`} />
          {suggestion && !loading ? suggestion : "GPT is summurisizing your task for the day."}
        </p>
      </div>
    </header>
  )
}

export default Header