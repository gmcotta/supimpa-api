import Institution from '../models/Institution';
import ImagesView, { ImageResponse } from './ImagesView';

type InstitutionResponse = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  retirement_or_center: string;
  phone: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  accepted: boolean;
  images: ImageResponse[];
};

export default {
  render(institution: Institution): InstitutionResponse {
    return {
      id: institution.id,
      name: institution.name,
      latitude: Number(institution.latitude),
      longitude: Number(institution.longitude),
      about: institution.about,
      retirement_or_center: institution.retirement_or_center,
      phone: institution.phone,
      instructions: institution.instructions,
      opening_hours: institution.opening_hours,
      open_on_weekends: institution.open_on_weekends,
      accepted: institution.accepted,
      images: ImagesView.renderMany(institution.images),
    };
  },

  renderMany(institutions: Institution[]): InstitutionResponse[] {
    return institutions.map(institution => this.render(institution));
  },
};
