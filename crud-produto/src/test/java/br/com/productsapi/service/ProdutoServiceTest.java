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

        assertNotNull(salvo.getId()); // 1. não nulo
        assertEquals("Monitor", salvo.getNome()); // 2. igual a string esperada
        assertTrue(salvo.getPreco() > 0); // 3. condição verdadeira
        assertFalse(salvo.getEstoque() == 0); // 4. condição falsa

        // Cleanup se quiser
        repository.deleteById(salvo.getId());
    }
}