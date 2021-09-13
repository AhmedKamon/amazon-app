import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActionArea,
  Button,
} from '@material-ui/core';
import { delBasePath } from 'next/dist/shared/lib/router/router';
import NextLink from 'next/link';
import Layout from '../components/Layout';
import db from '../Utiles/db';
import Product from '../models/product';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { Store } from '../Utiles/store';

const Home = ({ products }) => {
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  console.log(products);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.quantity < 0) {
      window.alert('Sorry. Product is not available');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item md={4} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      image={product.image}
                      title={product.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography>{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>

                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button
                    onClick={() => addToCartHandler(product)}
                    size="small"
                    color="primary"
                    variant="contained"
                  >
                    Add To Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};
export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
