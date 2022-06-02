import {FormikErrors} from 'formik'
import {isEmpty} from 'lodash'
import {ChangeEvent} from 'react'
import {FormOptionModal} from 'src/app/modules/common/Model'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import {imageBaseUrl} from 'src/cms/helpers/constants'

interface Props {
  handleChange: (e: ChangeEvent<any>) => void
  errors: FormikErrors<{[key: string]: string}> | any
  touched: any
  values: {[key: string]: string} | any
  editSelectedData: {[key: string]: string}
  setFieldValue: any
  mediaTypeOptions: FormOptionModal[]
}

export function MediaComponent({
  handleChange,
  errors,
  touched,
  values,
  setFieldValue,
  editSelectedData,
  mediaTypeOptions,
}: Props) {
  const seletedMediaTypeId = mediaTypeOptions.find(
    (item: FormOptionModal) => item.value === values.media.mediaTypeId
  )

  return (
    <>
      <div className=''>
        <div className='row'>
          <div className='col-md-6 col-xs-12'>
            <FormInputMediaManager
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              label='Header Image'
              name={`media.thumbImage`}
              setFieldValue={setFieldValue}
              value={values?.media?.thumbImage}
              required
            />

            {!isEmpty(values?.media?.thumbImage) ? (
              <>
                <li className='listing'>
                  <div className='thumbImageBlock'>
                    <button
                      type='button'
                      title='Remove'
                      className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                      onClick={() => {
                        setFieldValue(`media.thumbImage`, '')
                      }}
                    >
                      Delete
                    </button>

                    <img
                      className='thumbImage w-100 h-100'
                      src={`${imageBaseUrl}/${values?.media?.thumbImage}`}
                      alt=''
                    />
                  </div>
                </li>
              </>
            ) : null}
          </div>
          <div className='col-md-6 col-xs-12'>
            <FormSelect
              labelClassName='col-md-12'
              containerClassName='col-md-12'
              placeholder='Please Select MediaType'
              label='MediaType'
              name={`media.mediaTypeId`}
              onChange={handleChange}
              errors={errors}
              touched={touched}
              options={mediaTypeOptions}
              values={values}
              setFieldValue={setFieldValue}
              arrValue={values?.media?.mediaTypeId}
              required
            />
          </div>

          {seletedMediaTypeId?.systemName === 'image' ? (
            <div className='col-md-6 col-xs-12'>
              <FormInputMediaManager
                labelClassName='col-md-12'
                containerClassName='col-md-12'
                label='Image'
                name={`media.image`}
                setFieldValue={setFieldValue}
                value={values?.media?.image}
              />

              {!isEmpty(values?.media?.image) ? (
                <>
                  <li className='listing'>
                    <div className='thumbImageBlock'>
                      <button
                        type='button'
                        title='Remove'
                        className='btn thumbImage-remove d-flex align-items-center justify-content-center btn-primary'
                        onClick={() => {
                          setFieldValue(`media.image`, '')
                        }}
                      >
                        Delete
                      </button>

                      <img
                        className='thumbImage w-100 h-100'
                        src={`${imageBaseUrl}/${values?.media?.image}`}
                        alt=''
                      />
                    </div>
                  </li>
                </>
              ) : null}
            </div>
          ) : seletedMediaTypeId?.systemName === 'video' ? (
            <div className='col-md-6 col-xs-12'>
              <FormTextBox
                type='text'
                placeholder=''
                name={`media.iframe`}
                label='Iframe'
                containerClassName=''
                onChange={handleChange}
                errors={errors}
                touched={touched}
                as='textarea'
              />
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}
