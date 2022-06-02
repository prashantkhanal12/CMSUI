import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {isEmpty} from 'lodash'
import {Form, Formik} from 'formik'
import {toast} from 'react-toastify'
import * as Yup from 'yup'

import * as members from '../index'
import * as memberTypeRedux from '../../memberType/index'
import * as memberSubTypeRedux from '../../memberSubType/index'
import {StateParamsModel} from 'src/app/modules/common/Model'

import Modal from 'rsuite/Modal'

import FormTextBox from 'src/cms/helpers/components/forms/FormTextBox'
import FormSelect from 'src/cms/helpers/components/forms/FormSelect'
import FormTinyMce from 'src/cms/helpers/components/forms/FormTinyMce'
import FormInputMediaManager from 'src/cms/helpers/components/forms/FormInputMediaManager'
import {imageBaseUrl} from 'src/cms/helpers/constants'

type Props = {
  open: boolean
  params?: StateParamsModel
  handleClose: () => void
  actionType: string
  editSelectedData?: any
}
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
  memberTypeId: Yup.string().required('Merchant type is required'),
  memberSubTypeId: Yup.string().required('Merchant sub type is required'),
  memberFeaturedId: Yup.string().required('Member feature is required'),
  designation: Yup.string()
    .required('Designation is required')
    .matches(/^[A-Za-z\s]+$/, 'Must not contain number or symbol'),
})
const AddMember = ({open, params, handleClose, actionType, editSelectedData}: Props) => {
  const dispatch = useDispatch()
  const {memberfeatured, loading, success} = useSelector((state: any) => state.member)
  const [selectedMember, setSelectedMember] = useState('')

  const {
    data: {memberType},
  } = useSelector((state: any) => state.memberType)

  const {
    data: {memberSubType},
  } = useSelector((state: any) => state.memberSubType)

  useEffect(() => {
    dispatch(memberTypeRedux.actions.getAllMemberType())
    dispatch(members.actions.getFeaturedMember())
  }, [])

  useEffect(() => {
    if (selectedMember) {
      dispatch(memberSubTypeRedux.actions.getAllMemberSubType(selectedMember))
    }
  }, [selectedMember])

  const memberFeaturedOptions = memberfeatured.map((item: {[key: string]: string}) => ({
    label: item.display_name,
    value: item.id,
    systemName: item.system_name,
  }))

  const memberTypeOptions = memberType.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  const memberSubTypeOptions = memberSubType.map((item: {[key: string]: string}) => ({
    label: item.name,
    value: item.id,
  }))

  useEffect(() => {
    if (success) {
      isEmpty(editSelectedData)
        ? toast.success('Member added successfully')
        : toast.success('Member edited successfully')
      dispatch(members?.actions?.resetMember())
      dispatch(members?.actions.getMember(params))
      handleClose()
    }
  }, [success])

  return (
    <div className='modal-container'>
      <Modal
        open={open}
        onClose={handleClose}
        className='w-75'
        backdrop='static'
        keyboard={false}
        enforceFocus={false}
      >
        <Modal.Header>
          <Modal.Title>{actionType} Member </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Formik
              initialValues={{
                name: '',
                image: '',
                memberTypeId: '',
                memberSubTypeId: '',
                memberFeaturedId: '',
                designation: '',
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={(values) => {
                const formData = {
                  ...values,
                }
                if (!isEmpty(editSelectedData)) {
                  dispatch(members.actions.updateMember(formData, editSelectedData?.id))
                } else {
                  dispatch(members.actions.addMember(formData))
                }
              }}
            >
              {({touched, handleChange, errors, values, setFieldValue}) => {
                useEffect(() => {
                  if (!isEmpty(editSelectedData)) {
                    const fields = [
                      'designation',
                      'designation_np',
                      'additional_information',
                      'additional_information_np',
                      'id',
                      'message',
                      'message_np',
                      'name',
                      'name_np',
                      'image',
                    ]
                    fields.forEach((field) => setFieldValue(field, editSelectedData[field], false))
                    setFieldValue('memberFeaturedId', editSelectedData?.memberFeatured?.id, false)
                    setFieldValue('memberSubTypeId', editSelectedData?.memberSubType?.id, false)
                    setFieldValue(
                      'memberTypeId',
                      editSelectedData?.memberSubType?.memberType?.id,
                      false
                    )
                    setFieldValue(
                      'status',
                      editSelectedData?.status === true ? 'Active' : 'Inactive',
                      false
                    )
                  }

                  if (actionType === 'Add') {
                    setFieldValue(
                      'memberFeaturedId',
                      memberFeaturedOptions
                        ?.filter((items: any) => items.systemName === 'no')
                        .map((item: any) => item.value)
                        .toString(),
                      false
                    )
                  }
                }, [])

                return (
                  <Form>
                    <div className='card-body border-top pt-5'>
                      <div className='row'>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Name'
                            label='Name (EN)'
                            name='name'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Name (NP)'
                            label='Name (NP)'
                            name='name_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Designation'
                            label='Designation (EN)'
                            name='designation'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            required
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Designation (NP)'
                            label='Designation (NP)'
                            name='designation_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Member Type'
                            name='memberTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={memberTypeOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        {!isEmpty(values.memberTypeId)
                          ? setSelectedMember(values.memberTypeId)
                          : null}

                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Member Sub Type'
                            name='memberSubTypeId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={memberSubTypeOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormSelect
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Please select'
                            label='Featured Member'
                            name='memberFeaturedId'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                            options={memberFeaturedOptions}
                            required
                            values={values}
                            setFieldValue={setFieldValue}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormInputMediaManager
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            label='Image (EN)'
                            name='image'
                            setFieldValue={setFieldValue}
                            value={values?.image}
                          />

                          {!isEmpty(values?.image) ? (
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
                                    src={`${imageBaseUrl}/${values?.image}`}
                                    alt=''
                                  />
                                </div>
                              </li>
                            </>
                          ) : null}
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Message (EN)'
                            name='message'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.message : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTinyMce
                            containerClassName='col-md-12'
                            label='Message (NP)'
                            name='message_np'
                            initialValue={
                              !isEmpty(editSelectedData) ? editSelectedData?.message_np : ''
                            }
                            handleChange={handleChange}
                          />
                        </div>

                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Additional Information'
                            label='Additional Information (EN)'
                            name='additional_information'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                        <div className='col-md-6 col-xs-12'>
                          <FormTextBox
                            type='text'
                            labelClassName='col-md-12'
                            containerClassName='col-md-12'
                            placeholder='Enter Additional Information (NP)'
                            label='Additional Information (NP)'
                            name='additional_information_np'
                            onChange={handleChange}
                            errors={errors}
                            touched={touched}
                          />
                        </div>
                      </div>
                    </div>

                    <div className='d-flex justify-content-end px-9 '>
                      <button
                        type='submit'
                        disabled={loading}
                        className='btn btn-primary btn-sm ms-3'
                      >
                        Save
                      </button>
                      <button
                        type='button'
                        onClick={handleClose}
                        className='btn btn-secondary btn-sm ms-3'
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default AddMember
