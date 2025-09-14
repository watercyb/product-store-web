import {
  Box,
  HStack,
  IconButton,
  Image,
  Text,
  Heading,
  VStack,
  Dialog,
  Portal,
  Button,
  Field,
  Input,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product, onToast }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    onToast(success, message);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(
      product._id,
      updatedProduct
    );
    setIsOpen(false);
    onToast(success, message);
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack gap={2}>
          <IconButton onClick={() => setIsOpen(true)} colorPalette="blue">
            <FiEdit />
          </IconButton>
          <Dialog.Root open={isOpen} onOpenChange={setIsOpen} size="md">
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Update Product</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body pb="4">
                    <VStack gap="4">
                      <Field.Root>
                        <Field.Label>Product Name</Field.Label>
                        <Input
                          placeholder="Product Name"
                          name="name"
                          value={updatedProduct.name}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              name: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Price</Field.Label>
                        <Input
                          placeholder="Price"
                          name="price"
                          type="number"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Image URL</Field.Label>
                        <Input
                          placeholder="Image URL"
                          name="image"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value,
                            })
                          }
                        />
                      </Field.Root>
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Button
                      colorPalette="blue"
                      mr={3}
                      onClick={() => handleUpdateProduct()}
                    >
                      Update
                    </Button>
                    <Button variant="ghost" onClick={() => setIsOpen(false)}>
                      Cancel
                    </Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

          <IconButton
            onClick={() => {
              handleDeleteProduct(product._id);
            }}
            colorPalette="red"
          >
            <MdOutlineDeleteForever />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;
