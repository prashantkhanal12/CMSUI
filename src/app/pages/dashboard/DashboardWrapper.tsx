import {FC, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import {FieldArray, Form, Formik} from 'formik'
import {SketchPicker} from 'react-color'

import {PageTitle} from 'src/cms/layout/core'
import FormColorPicker from 'src/cms/helpers/components/forms/FormColorPicker'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {ISettingTypeState} from 'src/app/modules/siteSettings/components/settings'
import {useSelector} from 'react-redux'
import {isEmpty} from 'lodash'

interface Props {
  applicationName: string | null
}

const DashboardPage = ({applicationName}: Props) => {
  return (
    <>
      <div className='card mb-5 mb-xl-10'>
        <div className='card-body pt-9 pb-9'>
          <span className='d-flex text-gray-800 text-hover-primary justify-content-center fs-2 fw-bolder me-1'>
            <h1> Welcome to {applicationName} Dashboard</h1>
          </span>
        </div>
      </div>
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  const [color, setColor] = useState({r: 255, g: 255, b: 255, a: 1})
  const [applicationName, setAplicationName] = useState('')
  const settingTypeData: ISettingTypeState = useSelector((state: any) => state.settingType)
  const onChange = (color: any) => {
    setColor(color.rgb)
  }

  useEffect(() => {
    if (!isEmpty(settingTypeData?.backendData)) {
      settingTypeData?.backendData &&
        settingTypeData?.backendData['Application Credentials']?.map((item: any) => {
          if (item?.name === 'applicationName') {
            setAplicationName(item?.value)
          }
        })
    }
  }, [settingTypeData])

  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage applicationName={applicationName} />
      {/* <Formik
        initialValues={{
          data: [],
        }}
        onSubmit={(values: any, {setSubmitting}) => {}}
      >
        {({isSubmitting, touched, handleChange, errors, values, setFieldValue}) => {
          return (
            <Form className='bg-white'>
              <div className='card-body border-top pt-5 '></div>
              <FormInputMediaManager
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                label='Image'
                name='image'
                setFieldValue={setFieldValue}
                value={values?.image}
              />
              <FormTinyMce name='editor' handleChange={handleChange} />
              <FormColorPicker
                name='colorPicker'
                value={values?.colorPicker}
                onChange={handleChange}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
              />
              <div className='justify-content-end px-9 pb-9'>
                <button type='submit' disabled={false} className='btn btn-primary btn-sm w-100'>
                  Save
                </button>
              </div>
            </Form>
          )
        }}
      </Formik> */}
    </>
  )
}

export {DashboardWrapper}
