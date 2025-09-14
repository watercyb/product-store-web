import { Container, HStack, Button, Flex, Text } from "@chakra-ui/react";
import { FaRegPlusSquare } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useColorMode } from "../components/ui/color-mode";

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const modeButtonStyles = {
    bg: colorMode === "light" ? "gray.200" : "gray.800",
    color: colorMode === "light" ? "black" : "white",
    _hover: {
      bg: colorMode === "light" ? "gray.300" : "gray.700",
    },
  };

  return (
    <Container maxW="container.xl" px={{ base: 10, sm: 16 }}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          as={Link}
          to="/"
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          css={{
            background: "linear-gradient(to right, #00B5D8, #3182CE)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Product Store 🛒
        </Text>

        <HStack gap={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button {...modeButtonStyles}>
              <FaRegPlusSquare style={{ width: "20px", height: "20px" }} />
            </Button>
          </Link>
          <Button {...modeButtonStyles} onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default Navbar;
