import { Http } from "./http";

export class MailingService extends Http {
  static async sendInvitationMail(mailto: string, clubId: string, categoryId?: string) {
    try {
      const res = await this.post('mailing/invite', { email: mailto, club: clubId, category: categoryId });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  static async sendResetPasswordMail(mailto: string) {
    try {
      const res = await this.post('users/change-password-request', { mailto });
      return res
    } catch (error) {
      throw error;
    }
  }
}