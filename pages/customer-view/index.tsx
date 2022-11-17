import AppLayout from '@src/layouts/AppLayout';
import { Card, Select } from 'flowbite-react';
import React, { ReactElement } from 'react'

const CustomerViewPage = () => {
  return (
    <div className=''>
      <Card>
        <div className='grid grid-cols-4 gap-4'>
          <div>
            <label htmlFor="msisdn" className="block mb-2 text-sm font-medium text-vodafone">Msisdn</label>
            <input type="number" id="msisdn" className="border spin-button-none border-vodafone text-gray-900 text-sm rounded focus:ring-vodafone focus:border-vodafone block w-full p-2" />
          </div>
          <div>
            <label htmlFor="small" className="block mb-2 text-sm font-medium text-vodafone">Select the journey</label>
            <select id="small" className="block w-full p-2 text-sm text-gray-900 border border-vodafone rounded focus:ring-vodafone focus:border-vodafone">
              <option selected>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div>
            <label htmlFor="small" className="block mb-2 text-sm font-medium text-vodafone">Select the period</label>
            <select id="small" className="block w-full p-2 text-sm text-gray-900 border border-vodafone rounded focus:ring-vodafone focus:border-vodafone">
              <option>Choose a country</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
            <button type="button" className="focus:outline-none mt-7 w-full text-white bg-vodafone hover:bg-vodafone focus:ring-4 focus:ring-vodafone font-medium rounded text-sm px-5 py-2.5 mr-2 mb-2">Start process</button>
        </div>
      </Card>
      <div>
      <svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M25.0866 15.9962C22.7495 14.7514 21.4788 14.5559 18.482 14.057C18.482 8.56832 21.9782 3.07968 21.9782 3.07968C21.9782 3.07968 16.551 4.00486 12.5013 6.57245C9.73842 8.32411 7.14499 10.9895 5.50887 13.558C2.40439 18.0002 1.84278 22.5264 2.03315 26.2641C2.24667 35.0364 9.56734 41.5797 17.5622 41.5797C25.557 41.5797 32 35.3206 32 27.2828C32 21.6166 29.359 18.3599 25.3801 16.1557" stroke="#E60000"></path></svg>
      </div>
    </div>
  )
}

CustomerViewPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default CustomerViewPage