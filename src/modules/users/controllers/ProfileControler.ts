import { Request, Response } from "express";
import ShowUserProfileService from "../services/ShowUserProfileService";
import UpdateUserProfileService from "../services/UpdateUserProfileService";
import { canUpdateUserProfile } from "../common/validators";

export default class ProfileController{
  public async show(req: Request, res: Response){
    const showProfileServise = new ShowUserProfileService();

    const user = await showProfileServise.execute({id: req.user.id});

    return res.status(200).json(user)
  }

  public async update(req: Request, res: Response){
    const updateUserProfileService = new UpdateUserProfileService();
    const userId = req.user.id;
    const {name, email, password, oldPassword} = req.body;

    await canUpdateUserProfile(req);

    const user = await updateUserProfileService.execute({
      id: userId,
      name,
      email,
      password,
      oldPassword
    });

    return res.status(200).json(user);
  }
}
