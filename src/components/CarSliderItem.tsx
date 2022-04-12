import React from "react";
import { Block, Text, Flex, useTheme, Link } from 'vcc-ui';
import { Car } from "../types";

export const CarSliderItem: React.FC<{ car: Car }> = ({ car }) => {
const theme = useTheme();
    return (
        <Block>
            <Block>
                <Text as="span" extend={{ textTransform: 'uppercase', color: theme.color.foreground.secondary }} variant="bates" subStyle="emphasis">{car.bodyType}</Text>
            </Block>
            <Flex extend={{ flexDirection: 'row', flexWrap: 'wrap', onlyM: { maxWidth: '200px' }}}>
                <Text as="h4" extend={{ marginRight: 5  }} variant="columbus" subStyle="emphasis">{car.modelName}</Text>
                <Text as="span" extend={{ color: theme.color.foreground.secondary }} variant="columbus">{car.modelType}</Text>
            </Flex>
            <Block extend={{ margin: '20px 0 10px 0'}}>
                <img style={{"width": "100%"}} src={car.imageUrl} alt="Car" />
            </Block>
            <Flex extend={{ flexDirection: 'row',  justifyContent: 'center' }}>
                <Flex extend={{ marginRight: 20 }}>
                    <Link href={`/learn/${car.id}`} arrow="right">Learn</Link>
                </Flex>
                <Flex>
                    <Link href={`/shop/${car.id}`} arrow="right">Shop</Link>
                </Flex>
            </Flex>
        </Block>
    )
};
