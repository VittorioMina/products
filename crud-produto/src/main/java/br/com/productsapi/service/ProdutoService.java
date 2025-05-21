package br.com.productsapi.service;

import br.com.productsapi.model.Produto;
import br.com.productsapi.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository repository;

    public Produto salvar(Produto produto) {
        if (produto.getNome() == null) {
            throw new IllegalArgumentException("Nome do produto não pode ser nulo");
        }
        return repository.save(produto);
    }

    public Produto buscarPorId(Long id) {
        Optional<Produto> produto = repository.findById(id);
        return produto.orElse(null);
    }

    public List<Produto> listarTodos() {
        return repository.findAll();
    }

    public void deletar(Long id) {
        repository.deleteById(id);
    }

    public Produto atualizar(Long id, Produto produtoAtualizado) {
        Produto produtoExistente = buscarPorId(id);
        if (produtoExistente == null) {
            return null;
        }
        produtoExistente.setNome(produtoAtualizado.getNome());
        produtoExistente.setPreco(produtoAtualizado.getPreco());
        produtoExistente.setEstoque(produtoAtualizado.getEstoque());
        return repository.save(produtoExistente);
    }
}