import express, { Application, Request, Response } from 'express';


const app: Application = express();

const PORT = process.env.PORT || 9000

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello express.');
})


app.listen(PORT, () => {
    console.log('Server listening on port' , PORT)
})