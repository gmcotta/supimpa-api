import Image from '../models/Image';

export type ImageResponse = {
  id: number;
  url: string;
};

export default {
  render(image: Image): ImageResponse {
    return {
      id: image.id,
      url: `${process.env.API_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): ImageResponse[] {
    return images.map(image => this.render(image));
  },
};
