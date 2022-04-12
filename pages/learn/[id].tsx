import { GetServerSideProps } from "next";
import { Text } from 'vcc-ui';

const LearnPage:React.FC<{ car: number }>  = ({ car }) => {
    return (
      <Text>Learn about {car}</Text>
    )
}
export default LearnPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const car = params?.id;
    return {
      props: {
        car
      },
    };
}