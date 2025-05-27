import { Router, Request, Response } from 'express';
const router = Router();

export const getAllUsers = (req: Request, res: Response) => {
    res.json([{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Smith" }]);
};

router.get('/', getAllUsers);
router.get('/:id', (req: Request, res: Response) => {res.json({"Message": `ALL GOOD! ${req.params.id}`})});

export default router;
