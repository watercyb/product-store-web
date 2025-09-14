import { Container, VStack, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { Toaster, toaster } from "../components/ui/toaster";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  const showToast = (success, message) => {
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      closable: true,
    });
  };

  return (
    <Container maxW="container.xl" py={12}>
      <Toaster />
      <VStack gap={8}>
        <Heading
          fontSize={30}
          fontWeight="bold"
          textAlign="center"
          css={{
            background: "linear-gradient(to right, #00B5D8, #3182CE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Currenct Products 🛒
        </Heading>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          gap={10}
          w="full"
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onToast={showToast}
            />
          ))}
        </SimpleGrid>

        {products.length === 0 && (
          <Text
            fontSize="xl"
            textAlign="center"
            fontWeight="bold"
            color="gray.500"
          >
            No products found 🛒{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
