import { GetServerSideProps } from "next";
import { Text } from 'vcc-ui';

const ShopPage: React.FC<{ car: number }>  = ({ car }) => {
    return (
      <Text>Buy {car}</Text>
    )
}
export default ShopPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const car = params?.id;
    return {
      props: {
        car
      },
    };
}