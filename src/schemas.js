import Joi from "joi"

export const roomSchema = Joi.object({
    can_cuoc_cong_dan: Joi.string().allow('', null).default(null),
    dien_tich: Joi.number().min(0).required(),
    ma_phong: Joi.string().required(),
    trang_thai: Joi.number().allow(null).default(0)
})

export const vehicleSchema = Joi.object({
    bien_xe: Joi.string().max(20).required(),
    loai_xe: Joi.string().valid('xe_may', 'o_to').required(),
    ma_phong: Joi.string().max(10).required()
})

export const donationSchema = Joi.object({
    ma_phong: Joi.string().max(10).required(),
    mo_ta: Joi.string().allow('', null).default(''),
    so_tien: Joi.number().min(0).required(),
    thoi_gian: Joi.date().allow('', null)
})

export const baseBillSchema = Joi.object({
    loai_phi: Joi.string().max(50).required(),
    gia_co_so: Joi.number().required(),
    mo_ta: Joi.string().allow('', null).default('')
})
