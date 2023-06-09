import React, { useCallback, useLayoutEffect, useState } from 'react'
import { Loader, Card, FormFeild } from '../components'
import axios from 'axios'

const Home = () => {
  const [Loading, setLoading] = useState(true)
  const [allPost, setAlllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')

  const RenderCards = useCallback(({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} {...post} />)
    }

    return <h2 className='mt-5 font-bold text-[#6449ff] text-xl uppercase' >{title}</h2>
  }, [])

  useLayoutEffect(() => {

    const getPosts = async () => {
      try {
        setLoading(true)

        let response = await axios.get('http://localhost:5000/api/v1/post')

        setAlllPosts(response['data'].data)
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    getPosts()
  }, [])

  const handleSearch = (e) => {
    setSearchText(e.target.value)

    setLoading(true)

    setTimeout(async () => {
      try {

        setAlllPosts([])

        let response = await axios.get('http://localhost:5000/api/v1/post/search', {
          params: {
            search: e.target.value
          }
        })

        setAlllPosts(response['data'].data)
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }, 1000)
  }

  return (
    <section className='max-w-7x1 mx-auto' >
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]' >
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormFeild
          labelName={'Search posts'}
          handleChange={handleSearch}
          value={searchText}
          name="text"
          placeholder={'Search posts'}
          type={'text'}
        />
      </div>

      <div className="mt-10">
        {
          Loading ? (
            <div className='flex justify-center items-center' >
              <Loader />
            </div>
          ) : (
            <>
              {
                searchText && (
                  <h2 className='font-medium text-[#666e75] text-xl mb-3' >
                    Showing  results for <span className='text-[#222328]' >{searchText}</span>
                  </h2>
                )
              }

              <div className='grid lg-grid-cols-4 sm:grid-cols-3 xl:grid-cols-2 
              grid-cols-1 gap-3' >
                {
                  searchText ? (
                    <RenderCards
                      data={allPost}
                      title={"No search results"}
                    />
                  ) : (
                    <RenderCards
                      data={allPost}
                      title={"No posts found"}
                    />
                  )
                }
              </div>
            </>
          )
        }
      </div>
    </section>
  )
}

export default Home