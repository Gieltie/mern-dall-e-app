import React from 'react'

const FormField = ({ labelName, type, name, placeholder, value, handleChange, isSurpriseMe, handleSurpriseMe }) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
          htmlFor={name} 
          className='block text-sm font-medium text-[#101917] text-[16px]'
        >
          {labelName}
        </label>
        {isSurpriseMe && (
          <button 
            type='button' 
            onClick={handleSurpriseMe} 
            className='font-semibold text-xs px-2 py-1.5 rounded-[5px] bg-[#5F9B8E] hover:bg-[#6BBCAB] text-white transform transition-all'
          >
            Surprend moi
          </button>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5F9B8F] focus:border-[#5F9B8E] outline-none block w-full p-3'
      />
    </div>
  )
}

export default FormField
