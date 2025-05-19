package br.com.productsapi.service;

import br.com.productsapi.model.Produto;
import br.com.productsapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public Produto salvar(Produto produto) {
        return repository.save(produto);
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public Produto buscarPorId(Long id) {
        return repository.findById(id).orElse(null);
    }

    public Produto atualizar(Long id, Produto novoProduto) {
        Produto existente = buscarPorId(id);
        if (existente != null) {
            existente.setNome(novoProduto.getNome());
            existente.setPreco(novoProduto.getPreco());
            existente.setEstoque(novoProduto.getEstoque());
            return repository.save(existente);
        }
        return null;
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }
}
