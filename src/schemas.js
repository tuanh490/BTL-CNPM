import Joi from "joi"

export const roomSchema = Joi.object({
    can_cuoc_cong_dan: Joi.string(),
    dien_tich: Joi.number().required().min(0),
    ma_phong: Joi.string().required(),
    trang_thai: Joi.number()
})

export const vehicleSchema = Joi.object({
    bien_xe: Joi.string().max(20).required(),
    loai_xe: Joi.string().valid('xe_may', 'o_to').required(),
    ma_phong: Joi.string().max(10).required()
})