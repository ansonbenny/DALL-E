import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormFeild, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    prompt: '',
    photo: ''
  })

  const [generatingImg, setGeneratingImg] = useState(false)

  const [loading, setLoading] = useState(false)

  return (
    <section>
      
    </section>
  )
}

export default CreatePost