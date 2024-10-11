import { Button, FileInput, Select, TextInput } from 'flowbite-react'
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CircularProgressbar } from 'react-circular-progressbar'

export default function CreatePost() {
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
        <h1 className='text-center text-3xl my-7 font-semibold' >Create a poem</h1>
        <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Poem Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            style={{
                backgroundColor: '#f5e1c1',  // Light brown background color
                color: '#4b3621',            // Dark brown text color
                border: '1px solid #4b3621', // Dark brown border
                padding: '10px'
              }}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            style={{
                backgroundColor: '#f5e1c1',  // Light brown background color
                color: '#4b3621',            // Dark brown text color
                border: '1px solid #4b3621', // Dark brown border

              }}
          >
            <option value='uncategorized'>Select a category</option>
            <option value='romantic'>Romantic</option>
            <option value='sad'>Sad</option>
            <option value='poetfav'>Poet's Favourite</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-black border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            style={{
                backgroundColor: '#f5e1c1',  // Light brown background color
                color: '#4b3621',            // Dark brown text color
                border: '1px solid #4b3621', // Dark brown border
              }}
          />
          <Button
            type='button'
            gradientDuoTone='redToYellow'
            size='sm'
          >
            Upload image
          </Button>
          </div>
            <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
          style={{
            backgroundColor: '#f5e1c1',  // Light brown background color
            color: '#4b3621',            // Dark brown text color
           // Dark brown border
            padding: '10px'
          }}
        />
        <Button type='submit' gradientDuoTone='redToYellow'>
            Publish
        </Button>
    
        </form>
    </div>
  )
}
