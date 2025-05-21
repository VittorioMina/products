package br.com.productsapi.service;

import br.com.productsapi.model.Produto;
import br.com.productsapi.repository.ProdutoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProdutoServiceIntegrationTest {

    @Autowired
    private ProdutoService service;

    @Autowired
    private ProdutoRepository repository;

    @Test
    void testSalvarProdutoIntegracao() {
        Produto produto = new Produto();
        produto.setNome("Monitor");
        produto.setPreco(750.0);
        produto.setEstoque(5);

        Produto salvo = service.salvar(produto);

        assertNotNull(salvo.getId());
        assertEquals("Monitor", salvo.getNome());
        assertEquals(750.0, salvo.getPreco());
        assertEquals(5, salvo.getEstoque());

        // Cleanup se quiser
        repository.deleteById(salvo.getId());
    }
}
