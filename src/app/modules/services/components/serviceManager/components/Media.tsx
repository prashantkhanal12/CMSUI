import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: any}>
  touched: any
  setFieldValue: any
  values: any
  serviceMediaTypeOptions: FormOptionModal[]
}

const Media = ({
  handleChange,
  errors,
  touched,
  setFieldValue,
  values,
  serviceMediaTypeOptions,
}: Props) => {
  const serviceMediaTypeOption = serviceMediaTypeOptions?.find((option: FormOptionModal) => {
    return option.value === values?.media[0]?.mediaTypeId
  })

  return (
    <div className='row'>
      <div className='row justify-content-between mt-5'>
        <div className='col-6'>
          <>
            <FormInputMediaManager
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              label='Thumbnail Image'
              name='media[0].thumbImage'
              setFieldValue={setFieldValue}
              value={values?.media[0]?.thumbImage}
              required={true}
            />

            {!isEmpty(values?.media[0]?.thumbImage) ? (
              <>
                <li className='listing'>
                  <div className='thumbImageBlock'>
                    <button
                      type='button'
                      title='Remove'
                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                      onClick={() => {
                        setFieldValue('thumbImage', '')
                      }}
                    >
                      Delete
                    </button>

                    <img
                      className='thumbImage w-100 h-100'
                      src={`${imageBaseUrl}/${values?.media[0]?.thumbImage}`}
                      alt=''
                    />
                  </div>
                </li>
              </>
            ) : null}
          </>
        </div>

        <div className='col-6'>
          <FormSelect
            labelClassName='col-md-12'
            containerClassName='col-md-12'
            placeholder='Please select media type'
            label='Image or Video'
            name='media[0].mediaTypeId'
            onChange={handleChange}
            errors={errors}
            touched={touched}
            options={serviceMediaTypeOptions}
            values={values}
            setFieldValue={setFieldValue}
            arrValue={values?.media[0]?.mediaTypeId}
            required
          />
        </div>
        <div className='col-6'></div>
        <div className='col-6'>
          {serviceMediaTypeOption?.systemName === 'video' && (
            <FormTextBox
              type='text'
              placeholder=''
              name='media[0].iframe'
              label='Iframe'
              containerClassName=''
              onChange={handleChange}
              errors={errors}
              touched={touched}
              as='textarea'
            />
          )}

          {serviceMediaTypeOption?.systemName === 'image' && (
            <>
              <FormInputMediaManager
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                label='Image'
                name='media[0].image'
                setFieldValue={setFieldValue}
                value={values?.media[0]?.image}
              />

              {!isEmpty(values?.media[0]?.image) ? (
                <>
                  <li className='listing'>
                    <div className='thumbImageBlock'>
                      <button
                        type='button'
                        title='Remove'
                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                        onClick={() => {
                          setFieldValue('image', '')
                        }}
                      >
                        Delete
                      </button>

                      <img
                        className='thumbImage w-100 h-100'
                        src={`${imageBaseUrl}/${values?.media[0]?.image}`}
                        alt=''
                      />
                    </div>
                  </li>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Media
