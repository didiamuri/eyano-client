import AppLayout from '@src/layouts/AppLayout';
import React, { ReactElement } from 'react'

const MpesaCustomerAnalysisPage = () => {
  return (
    <div>MpesaCustomerAnalysisPage</div>
  )
}

MpesaCustomerAnalysisPage.getLayout = (page: ReactElement) => <AppLayout>{page}</AppLayout>;

export default MpesaCustomerAnalysisPage