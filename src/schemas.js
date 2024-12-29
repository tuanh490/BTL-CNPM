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

export const userTypedBillSchema = Joi.object({
    loai_phi: Joi.string().max(50).required(),
    so_tien: Joi.number().required(),
    mo_ta: Joi.string().allow('', null).default(''),
    thoi_gian: Joi.date().allow('', null)
})

export const monthlyBillSchema = Joi.object({
    thoi_gian_dong: Joi.date().allow('', null),
    trang_thai: Joi.number().allow(null).default(0)
})

export const residentSchema = Joi.object({
    can_cuoc_cong_dan: Joi.string().length(12).allow('', null).default(null),
    ma_phong: Joi.string().max(10).required(),
    ho_ten: Joi.string().max(100).required(),
    gioi_tinh: Joi.string().default(null),
    ngay_sinh: Joi.date().allow('', null),
    timeIn: Joi.date().required().allow('', null),
    timeOut: Joi.date().allow('', null),
    dang_o: Joi.number()
})

export const residencySchema = Joi.object({
    trang_thai: Joi.string().required(),
    thoi_gian: Joi.date().allow('', null),
    mo_ta: Joi.string().allow('', null).default(''),
    can_cuoc_cong_dan: Joi.string().length(12).allow('', null).default(null),
    ho_ten: Joi.string().required()
})