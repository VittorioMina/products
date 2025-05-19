package br.com.productsapi.service;

import br.com.productsapi.model.Produto;
import br.com.productsapi.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ProdutoServiceTest {

    @InjectMocks
    private ProdutoService service;

    @Mock
    private ProdutoRepository repository;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSalvarProduto() {
        Produto produto = new Produto();
        produto.setNome("Teclado");
        produto.setPreco(150.0);
        produto.setEstoque(10);

        when(repository.save(produto)).thenReturn(produto);

        Produto salvo = service.salvar(produto);

        assertNotNull(salvo);
        assertEquals("Teclado", salvo.getNome());
        assertEquals(150.0, salvo.getPreco());
        assertEquals(10, salvo.getEstoque());
    }

    @Test
    void testBuscarPorId() {
        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("Mouse");

        when(repository.findById(1L)).thenReturn(Optional.of(produto));

        Produto encontrado = service.buscarPorId(1L);

        assertNotNull(encontrado);
        assertEquals(1L, encontrado.getId());
        assertEquals("Mouse", encontrado.getNome());
    }
}
