import { CronJob } from 'cron'
import { monthlyInsert } from './monthlyInsert.js';

const job = new CronJob(
    '0 0 0 1 * *',
    async function () {
        try {
            console.log(`Start job at ${new Date()}`)
            await monthlyInsert();
            console.log("Successfully Inserted")
        }
        catch (err) {
            console.log(err)
        }
    },
    null,
    false
);

export default job;

